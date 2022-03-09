# 考核題目 https://the-z.notion.site/Z-Smart-Contract-Research-5ea2761beec044eabd0154f87e89ba4c

1. 請從此 EIP 清單中挑選一個你覺得未來可能會用到，但目前尚未被大量使用的來分享，寫下他為何重要、有哪些可能的應用場景，例如如果 xxx 項目使用此 EIP，將會造成什麼樣的效果等  
    1. [https://eips.ethereum.org/erc](https://eips.ethereum.org/erc)  
2. 閱讀以下智能合約審計報告，理解後用自己的話寫下 summary 與學到了什麼  
    1. [https://www.certik.com/projects/safemoon](https://www.certik.com/projects/safemoon) （點選 View PDF 可查看）  
3. 任選一個自己喜歡的項目，用 Miro 畫出該智能合約之簡易架構圖（EVM compatible 均可）  
4. 分享上課時未提到的智能合約相關好用工具  

# 1. 請從此 EIP 清單中挑選一個你覺得未來可能會用到，但目前尚未被大量使用的來分享，寫下他為何重要、有哪些可能的應用場景，例如如果 xxx 項目使用此 EIP，將會造成什麼樣的效果等  
參考資料 : https://eips.ethereum.org/EIPS/eip-2615  
我認為 NFT 租借將會是一個很大的市場，隨著 gamefi 和名人效應的興起，NFT可作為遊戲道具或是會員的入場券使用。  
然而現在仍然沒有一個廣泛的ERC標準支援NFT租借，只能透過傳統類似compound的租借模式，用戶透過付出抵押物和利息來租借NFT。但這完全不符合市場需求!試想一下今天在台灣租一棟房子房東會要求房客先付出等同甚至超過房屋價值的抵押物以免房客把房子轉賣給別人嗎？  
尷尬的是在以太坊的規則下任何NFT都不是原生代幣而是透過合約產生的，因此如果當初在宣告 ERC721 合約時沒有宣告租借NFT的相關規則，要防止租客把不屬於他的NFT轉帳到其他帳戶的唯一方法就是事先收取抵押物。  
![image](https://user-images.githubusercontent.com/70627447/153724871-898c88a8-2669-4ac2-a809-10bc13ad3e09.png)
(網址: https://testnet.rent.vera.financial/lend)  
(圖為知名NFT租借協議VERA的租借NFT頁面，用戶如果想要把帳戶閒置的NFT出租出去賺取收益需要掛單設定出租條件 ex. 利息、抵押品價值，掛單後等待租客成交)  
  
那有沒有辦法讓租客不用付出抵押品就可以租到NFT又能保證租客部不會把NFT任意轉給別人呢？有的。以往erc20標準中只會有一個mapping用來記錄這個token的owner是誰`mapping(uint256 => address) private _owners;`  
但是在eip-2615提案中新增了 Lien Holder、user，定義如下
``` Specification
This standard proposes three user roles: the Lien Holder, the Owner, and the User. Their rights are as follows:

A Lien Holder has the right to:
Transfer the Owner role
Transfer the User role

An Owner has the right to:
Transfer the Owner role
Transfer the User role

A User has the right to:
Transfer the User role
```
簡單來說現在NFT的持有者有兩種身分，一個是owner(房東)，一個是user(租客)，還有一個Lien Holder主要是負責管理出租的智能合約(房仲、第三方)。user只有這個NFT的使用權而不能把這個NFT賣掉或是轉移到其他錢包，就變得跟現實生活中租車租房很像，租客租借物品之前不再需要付出抵押品。  

# 2. 閱讀以下智能合約審計報告，理解後用自己的話寫下 summary 與學到了什麼 [https://www.certik.com/projects/safemoon](https://www.certik.com/projects/safemoon) （點選 View PDF 可查看） 
### project sumary
簡短列出這個項目在幹嘛，使用哪個語言在哪個鏈上發行  
### Audit summary
使用 Audit Methodology 方法論 (Static Analysis, Manual Review, Testnet Deployment)  
### Understandings
條列出合約的各種function、以及哪些功能只有owner能夠呼叫  
### Findings
列出各種錯誤或是可能被攻擊的漏洞  
Incorrect error message、Redundant code、Contract gains non-withdrawable BNBvia the swapAndLiquify function、Centralized risk in addLiquidity、Variable could be declared asconstant、Return value not handled、3rd party dependencies、Missing event emitting、Privileged ownership、Typos in the contract、The purpose of function deliver、Possible to gain ownership afterrenouncing the contract ownership、Potential sandwich attack  
共有14個潛在的可能錯誤並列出他們各自的嚴重等級。從較輕微的error message不精確和event沒有emit，到較嚴重的例如addLiquidity過於中心化的問題都有包含進去。  

## summary
整體而言和web2的審計報告蠻類似的。差別在於鏈上的世界由於可以自由為合約添加流動性，ownership的保護以及資金是否真正地去中心化，還有防範價格操縱類型的攻擊(ex. 閃電貸、三明治攻擊)就顯得更加重要。    
像是這個合約內最大的漏洞 `SSL-04 | Centralized risk in addLiquidity` 就是因為這個合約在去中心化交易所提供流動性的所有LP token都由一個address持有，如果哪天這個address要跑路或是私鑰被盜走的話會造成非常嚴重的後果。因此審計公司就建議可以用DAO的形式來管理資金並且將ownership的權限交由多重簽名錢包而不是單一個地址管理。    


# 3. 任選一個自己喜歡的項目，用 Miro 畫出該智能合約之簡易架構圖（EVM compatible 均可）  
NFTX 合約架構圖:  
https://miro.com/app/board/uXjVOLZwNkY=/?invite_link_id=293227344446  

# 4. 分享上課時未提到的智能合約相關好用工具  
看到一篇有趣的文章，內容是在說alpha shark如何破解閉源合約: https://medium.com/@b1995/onion-meta%E5%A4%8D%E7%9B%98-ca953b434192  
function 數據庫查詢工具: https://www.4byte.directory/signatures/?bytes4_signature=0x9092f3c8  
solidity 線上反編譯器: https://ethervm.io/decompile  



