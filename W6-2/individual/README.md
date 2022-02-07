# Solidity-EVM-Dev-Batch-1-HW

# 1. Follow 以下兩個教學並提供完成截圖：
    - Getting started tutorial: [https://docs.hedera.com/guides/getting-started/environment-set-up](https://docs.hedera.com/guides/getting-started/environment-set-up)
    - Create token: [https://www.youtube.com/watch?v=JZDAMScxbpU&ab_channel=Hedera](https://www.youtube.com/watch?v=JZDAMScxbpU&ab_channel=Hedera)
    - 測試用帳號（.env）：
 
# 2. 用自己的話列出 Solidity 在 Ethereum 與 Hedera 的差異
Hedera 採用 哈希圖 (Hashgraph) 共識機制，每筆交易按照時間戳排序，不能像以太坊塞錢給礦工就能被優先執行交易
hedera上的地址為 0.0.x 開頭
block.difficulty始終為0
在 Hedera 上 NFT和token 為原生資產，不用產生 ERC20、ERC721合約
在 Hedera 上透過 Javascript 引用合約的 Bytecode
Solidity 在 Hedera 上是透過 HTS.json 做為已編輯合約的參考
Solidity 在 Hedera 上是透過 HTS 函式庫做為參考介面程式庫



   

# 3. ERC721A
ERC721A 是 Azuki 團隊推出的 ERC721 合約改良版，透過從 OpenZeppelin (OZ) ERC721Enumerable 中刪除重複存儲，並在每次 mint 請求才更新一次存儲數據而不是每 mint 一個 NFT 就更新一次，大幅降低重複的存儲gas成本

## ERC721 和 ERC721A 的差別
### 新增三個變數 TokenOwnership、AddressData、currentIndex ， 新增兩個 mapping _ownerships、_addressData 取代  _owners, _balances
```
    struct TokenOwnership {
        address addr;
        uint64 startTimestamp;
    }
    struct AddressData {
        uint128 balance;
        uint128 numberMinted;
    }
    uint256 internal currentIndex;
 mapping(uint256 => TokenOwnership) internal _ownerships;
 mapping(address => AddressData) private _addressData;
 ```

### ERC721A 關鍵的部分 : 新增 ownershipOf
當合約要尋找NFT的主人時如果找不到會透過for迴圈自動往上一個尋找，這樣就可以不用把整個 mapping 填滿，相當節省 gas
![image](https://user-images.githubusercontent.com/70627447/152686148-5ebdf4e2-6608-43ce-88fb-2ccf6fd4a286.png)

```
function ownershipOf(uint256 tokenId) internal view returns (TokenOwnership memory) {
    require(_exists(tokenId), 'ERC721A: owner query for nonexistent token');

    unchecked {
        for (uint256 curr = tokenId; curr >= 0; curr--) {
            TokenOwnership memory ownership = _ownerships[curr];
            if (ownership.addr != address(0)) {
                return ownership;
            }
        }
    }

    revert('ERC721A: unable to determine the owner of token');
}
 ```
 
 ### 新增 _numberMinted
 ```
 // _numberMinted 為內部函數，可以查詢持有者 mint 了幾個 NFT
 function _numberMinted(address owner) internal view returns (uint256) {
    require(owner != address(0), 'ERC721A: number minted query for the zero address');
    return uint256(_addressData[owner].numberMinted);
}
```  
 ###  mint 新增 uint256 quantity, bytes memory _data, bool safe ， 支援一次 mint 多個 NFT
 ```
 function _mint(
    address to,
    uint256 quantity,
    bytes memory _data,
    bool safe
) internal {
    uint256 startTokenId = currentIndex;
    require(to != address(0), 'ERC721A: mint to the zero address');
    require(quantity != 0, 'ERC721A: quantity must be greater than 0');

    _beforeTokenTransfers(address(0), to, startTokenId, quantity);

    // Overflows are incredibly unrealistic.
    // balance or numberMinted overflow if current value of either + quantity > 3.4e38 (2**128) - 1
    // updatedIndex overflows if currentIndex + quantity > 1.56e77 (2**256) - 1
    unchecked {
        _addressData[to].balance += uint128(quantity);
        _addressData[to].numberMinted += uint128(quantity);

        _ownerships[startTokenId].addr = to;
        _ownerships[startTokenId].startTimestamp = uint64(block.timestamp);

        uint256 updatedIndex = startTokenId;

        for (uint256 i; i < quantity; i++) {
            emit Transfer(address(0), to, updatedIndex);
            if (safe) {
                require(
                    _checkOnERC721Received(address(0), to, updatedIndex, _data),
                    'ERC721A: transfer to non ERC721Receiver implementer'
                );
            }

            updatedIndex++;
        }

        currentIndex = updatedIndex;
    }

    _afterTokenTransfers(address(0), to, startTokenId, quantity);
}
 ```
 ### 其他覆寫的func
 #### IERC721Enumerable 的 totalSupply, tokenByIndex, tokenOfOwnerByIndex
 
 ```
 /**
 * @dev See {IERC721Enumerable-totalSupply}.
 */
function totalSupply() public view override returns (uint256) {
    return currentIndex;
}

/**
 * @dev See {IERC721Enumerable-tokenByIndex}.
 */
function tokenByIndex(uint256 index) public view override returns (uint256) {
    require(index < totalSupply(), 'ERC721A: global index out of bounds');
    return index;
}

/**
 * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
 * This read function is O(totalSupply). If calling from a separate contract, be sure to test gas first.
 * It may also degrade with extremely large collection sizes (e.g >> 10000), test for your use case.
 */
function tokenOfOwnerByIndex(address owner, uint256 index) public view override returns (uint256) {
    require(index < balanceOf(owner), 'ERC721A: owner index out of bounds');
    uint256 numMintedSoFar = totalSupply();
    uint256 tokenIdsIdx;
    address currOwnershipAddr;

    // Counter overflow is impossible as the loop breaks when uint256 i is equal to another uint256 numMintedSoFar.
    unchecked {
        for (uint256 i; i < numMintedSoFar; i++) {
            TokenOwnership memory ownership = _ownerships[i];
            if (ownership.addr != address(0)) {
                currOwnershipAddr = ownership.addr;
            }
            if (currOwnershipAddr == owner) {
                if (tokenIdsIdx == index) {
                    return i;
                }
                tokenIdsIdx++;
            }
        }
    }

    revert('ERC721A: unable to get token of owner by index');
}
```
#### IERC165-supportsInterface 的 supportsInterface、balanceOf
```
/**
 * @dev See {IERC165-supportsInterface}.
 */
function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return
        interfaceId == type(IERC721).interfaceId ||
        interfaceId == type(IERC721Metadata).interfaceId ||
        interfaceId == type(IERC721Enumerable).interfaceId ||
        super.supportsInterface(interfaceId);
}

/**
 * @dev See {IERC721-balanceOf}.
 */
function balanceOf(address owner) public view override returns (uint256) {
    require(owner != address(0), 'ERC721A: balance query for the zero address');
    return uint256(_addressData[owner].balance);
}
```
#### IERC721 的其他合約
```
/**
 * @dev See {IERC721-ownerOf}.
 */
function ownerOf(uint256 tokenId) public view override returns (address) {
    return ownershipOf(tokenId).addr;
}

/**
 * @dev See {IERC721Metadata-name}.
 */
function name() public view virtual override returns (string memory) {
    return _name;
}

/**
 * @dev See {IERC721Metadata-symbol}.
 */
function symbol() public view virtual override returns (string memory) {
    return _symbol;
}

/**
 * @dev See {IERC721Metadata-tokenURI}.
 */
function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');

    string memory baseURI = _baseURI();
    return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : '';
}

/**
 * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
 * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
 * by default, can be overriden in child contracts.
 */
function _baseURI() internal view virtual returns (string memory) {
    return '';
}

/**
 * @dev See {IERC721-approve}.
 */
function approve(address to, uint256 tokenId) public override {
    address owner = ERC721A.ownerOf(tokenId);
    require(to != owner, 'ERC721A: approval to current owner');

    require(
        _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
        'ERC721A: approve caller is not owner nor approved for all'
    );

    _approve(to, tokenId, owner);
}

/**
 * @dev See {IERC721-getApproved}.
 */
function getApproved(uint256 tokenId) public view override returns (address) {
    require(_exists(tokenId), 'ERC721A: approved query for nonexistent token');

    return _tokenApprovals[tokenId];
}

/**
 * @dev See {IERC721-setApprovalForAll}.
 */
function setApprovalForAll(address operator, bool approved) public override {
    require(operator != _msgSender(), 'ERC721A: approve to caller');

    _operatorApprovals[_msgSender()][operator] = approved;
    emit ApprovalForAll(_msgSender(), operator, approved);
}

/**
 * @dev See {IERC721-isApprovedForAll}.
 */
function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
    return _operatorApprovals[owner][operator];
}

/**
 * @dev See {IERC721-transferFrom}.
 */
function transferFrom(
    address from,
    address to,
    uint256 tokenId
) public override {
    _transfer(from, to, tokenId);
}

/**
 * @dev See {IERC721-safeTransferFrom}.
 */
function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId
) public override {
    safeTransferFrom(from, to, tokenId, '');
}

/**
 * @dev See {IERC721-safeTransferFrom}.
 */
function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes memory _data
) public override {
    _transfer(from, to, tokenId);
    require(
        _checkOnERC721Received(from, to, tokenId, _data),
        'ERC721A: transfer to non ERC721Receiver implementer'
    );
}

```

## 實作
將自己的 SamAzuki NFT 部屬在 Kovan 測試網上面
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./ERC721A.sol";
contract SamAzuki is ERC721A {
  constructor() ERC721A("SamAzuki", "SamAzuki") {}
  function mint(uint256 quantity) external payable {
    // _safeMint's second argument now takes in a quantity, not a tokenId.
    _safeMint(msg.sender, quantity);
  }
}
```
看看 mint 需要花費多少 gas
一次 mint 一個 ，花費 57845 個 gas:  (https://kovan.etherscan.io/tx/0x344646a96de9e89f5ce2edac9e8930a77e2f6bde2e807dc6fe36302e49aef3c2)
![image](https://user-images.githubusercontent.com/70627447/152675529-d64998e6-dd82-4141-a61d-b07edb0def0d.png)
一次 mint 兩個 ，花費 60127 個 gas:  (https://kovan.etherscan.io/tx/0x53d48bec8159cfff241c0e78ddd18734fdf5522410a17544be9cfe42b3a5e2ed)
![image](https://user-images.githubusercontent.com/70627447/152675107-b9398122-01d6-4151-8373-fe6ae58b9df7.png)
一次 mint 五個，花費 66973 個 gas:   (https://kovan.etherscan.io/tx/0x22468b58299766559c209953b6686b6e817dfeb9279c4de37cb92125d86866ed)
![image](https://user-images.githubusercontent.com/70627447/152675126-e8e49d17-4fbf-4d6a-8d9a-2422f3dddcab.png)




