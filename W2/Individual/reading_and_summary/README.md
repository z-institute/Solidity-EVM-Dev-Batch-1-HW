# Summary
## 1. [Ethereum Hard Fork Bug that split Ethereum’s chain in two](https://www.coindesk.com/tech/2020/11/11/ethereums-unannounced-hard-fork-was-trying-to-prevent-the-very-disruption-it-caused/)
### 總結:
#### a.因為一個重大且危險的BUG被修復，但開發者不想擴大事態招引駭客而沒有公布，因此大部分礦工並不知情，不過此更新卻修改了共識層的機制，導致礦工用戶端系統不同步造成Ethereum產生了兩條鏈。
#### b.這也讓維護的社群有過度中心化的風險以及透明度等信任問題，使用此共識層的DAPP也都會面臨崩潰的危機。
### 避免方法:
#### a.預先告知節點並抵押一定程度的原生代幣，如果故意使用BUG就扣押
#### b.偵測使用BUG的帳戶來標記
#### c.DAPP設定暫停機制
## 2. [How to retrieve tokens stuck in a crowdsale?](https://forum.openzeppelin.com/t/how-to-retrieve-tokens-stuck-in-a-crowdsale/3959)
### 避免方法:
#### a.眾籌時先寫好無法處理的退回機制
#### b.確定合約有實作某些ERC介面
#### c.gaslimit預先跑過
#### d.mainetfork確認交易正確
