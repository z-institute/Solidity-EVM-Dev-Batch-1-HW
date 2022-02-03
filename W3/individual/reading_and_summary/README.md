# https://insights.glassnode.com/defi-attacks-flash-loans-centralized-price-oracles/

## summary
閃電貸攻擊最常見的形式是價格預言機攻擊
中心化預言機從單個或少數去中心化交易所(DEX)中獲取資料，價格較容易被操縱
去中心化預言機能取得鏈下的數據，因此可以從多個交易所包含中心化交易所(CEX)中獲取資料。價格較不易被操縱
這一系列攻擊凸顯了DEFI協議使用去中心化價格預言機(ex.chainlink)的重要性



# https://consensys.github.io/smart-contract-best-practices/

## 乙太坊智能合約安全開發指南

### 基本理念
開發智能合約犯錯的代價是巨大的，因為它很難像web2服務一樣輕易的修補bug。
因此身為一個開發者應謹慎發布合約，並保持合約的邏輯易懂，還有清楚區塊鏈的特性。

### 開發Solidity的安全建議
#### 避免外部調用
調用不受信任的外部合約可能會引發一系列的意外
#### 優先使用 pull 而不是 push
當合約需要轉移資產時盡量讓收款方發起調用函數並收回資產
#### 標記外部合約
當調用外部合約時合約接口命名因標記它們可能是不安全的
#### 處理外部調用錯誤
ex.   address.call()、address.callcode()、address.delegatecall()、address.send()


### 軟體開發技巧
#### 升級有問題的合約
ex.  、使用DELEGATECALL調用


