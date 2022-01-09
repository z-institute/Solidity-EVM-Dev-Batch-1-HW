# 閱讀資料 Summary
## 1. [https://insights.glassnode.com/defi-attacks-flash-loans-centralized-price-oracles/](https://insights.glassnode.com/defi-attacks-flash-loans-centralized-price-oracles/)

- 越來越多的 DeFi 專案受到使用閃電貸款的攻擊
- 閃電貸款可以借入大量資金而無需抵押品使自己承受的風險很小
- 最常見的攻擊是對使用從單個交易所上的資產拿價格資料的 centralized Price Oracles 的 DeFi
- 使用像 Chainlink 這樣的 decentralized Oracles 可以避免類似的問題
- 如果智能合約夠安全閃電貸款攻擊就不會實現

## 2. [https://consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)

- 當智能合約出現錯誤時停止合約
- 限制轉帳速率和轉帳額度
- 進行徹底的測試後才部署合約，並在測試網時就提供賞金計畫
- 確保智能合約邏輯簡潔和使用已經被廣泛使用的合約或工具
- 使用最新的安全技術和工具並在新的漏洞被發現時檢查智能合約
- 盡量避免外部調用，若調用應標記不受信任的合約
- 記住鏈上的數據是公開的
- 明確標明函數和狀態變數的可見性
- 將程式鎖定到特定的編譯器版本
- 升級有問題的合約
