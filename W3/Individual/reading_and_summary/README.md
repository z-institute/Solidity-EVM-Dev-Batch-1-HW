# 閱讀資料 Summary
## 1. [https://insights.glassnode.com/defi-attacks-flash-loans-centralized-price-oracles/](https://insights.glassnode.com/defi-attacks-flash-loans-centralized-price-oracles/)
### summary
- Defi 大多數的攻擊是 flash loan-funded price oracle attack，其中主因是使用中心化 oracle
- flash loan-funded price oracle attack 原理為操作中心化 Oracle 報價，並在依賴中心化 Oracle Defi Protocol 進行套利
- 由於 flash loan 低成本及低風險的特性，造成攻擊越來越常發生

### how to prevent
- 使用可靠的去中心化 oracle e.g. `chainlink`
- 使用安全的 library 開發 e.g. `openzeppelin`
- 減少依賴外部合約


## 2. [https://consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
### summary
- 
