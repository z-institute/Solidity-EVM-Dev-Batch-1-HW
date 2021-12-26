# 閱讀資料 Summary
## 1. [Ethereum Hard Fork Bug that split Ethereum’s chain in two](https://www.coindesk.com/tech/2020/11/11/ethereums-unannounced-hard-fork-was-trying-to-prevent-the-very-disruption-it-caused/)
- Geth團隊為避免資安問題被有心人士利用，所以選擇暗中修改共識機制相關的程式碼，不主動對外揭露此事，然而部分節點認為僅是無偒大雅的patch而沒有更新，造成區塊鏈分叉。我認為此舉雖立意良善，但卻與去中心分的精神背導而馳
## 2. [How to retrieve tokens stuck in a crowdsale?](https://forum.openzeppelin.com/t/how-to-retrieve-tokens-stuck-in-a-crowdsale/3959)
- 寫合約時應實作safeTransfer把誤轉入的非ETH幣轉出
