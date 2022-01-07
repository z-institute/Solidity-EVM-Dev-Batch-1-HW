# 閱讀資料 Summary
## 1. 以開發者角度該如何避免類似問題 / 寫一個安全的智能合約需要注意哪些方面
    　1.不要使用單一DEX的Oracle，去使用Chainlink這類多來源，而且報價取中位數的Oracle
    　2.Rebase機制、重入攻擊、閃電貸攻擊，在寫Defi合約時，都必須得考慮到被攻擊的可能性
    　3.不要使用自己的隨機數生成器，容易被猜出規則
    　4.合約邏輯愈簡單，單一函數的功能愈少愈好
    　5.區塊鏈用於去中心化的系統部份
    　6.使用 Openzeppelin 這類已經被驗證過的技術
    　7.外部合約調用要注意

## 2. 任選上課時提到的五個（或以上）開發工具，並照著 Readme 試用看看，寫下簡易用法
      1.Remix　
        - File explorers 下新增空白 contract，視窗右方可選solidity code
        - Solidity compiler 可選擇 compiler 版本及 compile，如果有錯誤，左下方會有訊息
        - Deploy & Run Transactions 可選擇環境、Account、Gas limit、Message value、Contract，並做 Deploy
          左下方的 Deployed Contracts 可操作各種 Read/Write function
          右下方的訊息，則是 command line 的輸出結果
      2.VS Code
        - 微軟提供的免費開發工具，可安裝 solidity 開發的以下相關Plugins
        - Solidity
        - Solidity Contract Flattener
        - Solidity Debugger
        - Solidity Metrics
        - Solidity Visual Developer
      3.Ganache
        - 從官網下載安裝
        - 開啟Ganache之後，把workspace的server設定好
          Host name: 127.0.0.1
          Port number: 7545
          Network ID: 1337
        - 同時把 MetaMask 的錢包加一個 Localhost，這樣 Ganache 錢包就能和 MetaMask 同步
        - 配合 truff-config.js 內的 development 設定，把 ganache 當成一個私有鏈
        - 啟動即提供10個100ETH的帳號
        - delploy後的相關 block, transaction ... 均可在UI介面中找到
      4.Truffle
        - 安裝
          npm install -g truffle
          truffle version # 查看版本
          mkdir project_name
          cd project_name
          truffle init
        - 設定 truffle-config.js 的 networks, compiles
```
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
  },

  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
       optimizer: {
         enabled: true,
         runs: 200
       },
    }
  },
};
```        
        - truffle compile # 編譯
        - truffle migrate # 部屬
        - truffle migrate --reset
        - truffle console
      5.infura
        - 先完成註冊，建立一個新的 Project
        - 完成後，Project 會生成一個 PROJECT SECRET
        - 在 ENDPOINTS 可選擇不用的環境 Deploy
        - yarn add truffle-hdwallet-provider
        - 在 truffle-config.js 完成設定
```
networks: {
  ropsten: {
    provider: function () {
      return new HDWalletProvider("MetaMask助記詞<-這個不要用好了，感覺很危險", "拿到的endpoint");
  },
  network_id: '3',
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
  },
```
        - 佈署 truffle migrate --network ropsten
