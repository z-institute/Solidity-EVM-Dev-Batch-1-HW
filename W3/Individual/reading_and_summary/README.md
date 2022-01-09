# Summary
## 1. [defi-attacks-flash-loans-centralized-price-oracles](https://insights.glassnode.com/defi-attacks-flash-loans-centralized-price-oracles/)
### 總結&避免方法:
- 使用chainlink等去中心化報價協議
- DEFI合約須通過資安審計或通過滲透攻擊後再發布
- 貸款時要求部分保證金或抵押品，或是改善AMM模型價格變動過大時有暫停搓合機制
- 貸款時給于的資金為另外鑄造的證明，鎖倉一定時間(10分鐘)後才能換回資金
## 2. [smart-contract-best-practices](https://consensys.github.io/smart-contract-best-practices/)
### 總結&避免方法:
- 合約有暫停機制、資金控管、容易升級
- 合約測試完整 有新攻擊手段時添加測試 分階段推出
- 合約邏輯簡單 模組化 使用驗證過的函數(隨機生成)
- 區塊鏈應用於去中心化部分
- 保持更新(攻擊手段、版本、新技術或寫法)
- 不穩定或不信任的外部合約調用須標記或避免並避免惡意的狀態變化
- 了解solidity語言特性 使用openzepplin等驗證過的函數
- 需處理外部合約的錯誤 分離外部合約調用與核心邏輯
- 了解區塊鏈特性、了解已知攻擊
- 編寫可暫停、延遲、升級合約 並有賞金計畫
