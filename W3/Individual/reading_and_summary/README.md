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
#### General Philosophy
智能合約開發跟過去的軟體開發非常不一樣，只要犯錯代價非常大。
- 對錯誤有所準備
  - 當合約有問題，停止合約 (implement circuit breaker)
  - 管理帳戶的資金風險
  - 有效的升級跟修復
- 警慎地發布合約
  - 盡可能的測過所有合約
  - 提供 bug bounty 計畫
  - 階段性發布，並確保每個階段測試足夠
- 保持智能合約簡單
  - 確保邏輯簡潔
  - 模組化程式碼，並且確保 functions 簡單單一職責
  - 用被廣泛使用的的合約或工具
  - 程式碼清楚易懂比效能更重要
  - 只在你的系統去中心化的地方使用區塊鏈技術
- 保持更新
  - 有新漏洞發生檢查自己的合約
  - 盡可能的更新使用 library 跟 tool
  - 使用最新的安全技術
- 理解塊練特性
  - 小心外部合約呼叫
  - 注意 public function 且 private 屬性也能被任何看見
  - 理解 gas cost 跟 gas limit 區別
  - timestamp 在區塊鏈是不精準的

#### Secure Development Recommendations 
- 外部呼叫
  - 竟量避免外部呼叫
  - 標記不信任合約
  - 避免在外部呼叫後改變 state
  - 處理外部呼叫錯誤
  - 外部呼叫使用 pull 而不是 push
- 記得 Ether 可以強製發送到 account
- 記得鏈上資料是公開的
- Solidity specific recommendations
  - 使用 assert 檢查 runtime variable
  - 正確使用 `assert`, `require`, `revert`
  - modifier 只用於檢查
- fallback functions
  - 保持簡單
  - 檢查 data length
- 明確標示 payable function
- 明確標示 visibility in functions 跟 state variables
- compiler 版本需要定版
- 使用 events 監控合約
- 小心繼承多合約

#### Known Attacks 
- Reentrancy
重複呼叫同一個 function 可能會造成不可預期的錯誤
- Timestamp Dependence
礦工可以操作出塊時間，所以不要使用
- Integer Overflow and Underflow
unit 最大值為 2^256 只要超過就會從 0 開始，0 - 1 又會回到 2^256 
- DoS with (Unexpected) revert
- DoS with Block Gas Limit
- Insufficient gas griefing
- Forcibly Sending Ether to a Contract
#### Software Engineering
- 升級有問題合約
  - Use a registry contract to store latest version of a contract
  - Use a DELEGATECALL to forward data and calls
- Circuit Breaker (暫停合約功能)
- Speed Bumps (延遲合約動作)
- Rate Limiting 
e.g. 允許存款人在一段時間提款總額
- Contract Rollout
  - 100% test coverage
  - 部署在 testnet 上
  - 提供 bug bounty
  - 允許各種玩家跟合約互動測試
  - 在 mainnet 部署 beta 版限制曝險額度
- Bug Bounty
#### Documentation and Procedures

#### Token Implementation Best Practice
- 使用最新版本的標準
- Be aware of front running attacks on EIP-20
- 避免轉錢到 0x0 地址
- 避免轉錢到合約地址