# 閱讀資料 Summary
## 1. [Ethereum Hard Fork Bug that split Ethereum’s chain in two](https://www.coindesk.com/tech/2020/11/11/ethereums-unannounced-hard-fork-was-trying-to-prevent-the-very-disruption-it-caused/)
當找到嚴重的區塊鍊程式問題，修正者採取未公開的方式，將程式正確修正。但因為部分節點並未更新到新的程式，造成同一筆資料，形成不同區塊，也就會有兩個鍊。
## 2. [How to retrieve tokens stuck in a crowdsale?](https://forum.openzeppelin.com/t/how-to-retrieve-tokens-stuck-in-a-crowdsale/3959)
1.透過使用安全的函式(例如:safeTransfer)，避免合約執行動作的錯誤，造成貨幣交易錯誤。
2.建立一個合約暫存貨幣，經由特定的動作，來執行後續合約中代幣轉移的條件。
