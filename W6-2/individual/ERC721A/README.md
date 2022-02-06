# Solidity-EVM-Dev-Batch-1-HW

# ERC721A
ERC721A 是 Azuki 團隊推出的 ERC721 合約改良版，透過從 OpenZeppelin (OZ) ERC721Enumerable 中刪除重複存儲，並在每次 mint 請求才更新一次存儲數據而不是每 mint 一個 NFT 就更新一次，大幅降低重複的存儲gas成本

## ERC721 和 ERC721A 的差別
### 新增三個變數
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
 ```
 ### 新增兩個 mapping 取代  _owners, _balances
 ```
 mapping(uint256 => TokenOwnership) internal _ownerships;
 mapping(address => AddressData) private _addressData;
 ```
 ### 覆寫 totalSupply, tokenByIndex, tokenOfOwnerByIndex
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
### 


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



