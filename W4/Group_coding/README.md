# [Week4][Group3] Homework

## Deploy Opyn’s smart contract to ARBITRUM

先至 Infura 註冊帳號後, 接著到 ADD-ON 分頁訂閱 Arbitrum：

![](https://i.imgur.com/ulEm1lS.png)

Clone Opyn’s smart contract 專案並安裝：

```sh
git clone https://github.com/opynfinance/GammaProtocol.git
cd GammaProtocol
npm i
```

編譯合約：

```sh
npm run build
```

若是使用要使用 Infura 提供的服務, 就必須先改 RPC 位置, 在專案資料夾中找到 package.json 第 25 行程式碼, 開啟並編輯：

```
"ganache": "ganache-cli -d --port 8545 --defaultBalanceEther 500 -f https://arbitrum-mainnet.infura.io/v3/<your_infura_id>",
```

存檔後就可以將 Ganache 跑起來：

```sh
npm run ganache
```

會看到以下畫面：

![](https://i.imgur.com/uDSf7mc.png)

接著開始部署合約：
```sh
npm run deploy:development
```

![](https://i.imgur.com/ampuW0c.png)


完成後就可以開始跑測試：

```sh
npm run test:unit
npm run test:integration
```

![](https://i.imgur.com/W31YZCB.png)

最後的測試結果：

![](https://i.imgur.com/z6ipJsY.png)

![](https://i.imgur.com/ApKtMDn.png)

可以執行 coverage 產生表格：

```
npm run coverage
```

![](https://i.imgur.com/5rux2CP.png)

完成後也可以開啟 coverage/index.html 看到網頁版的結果：

![](https://i.imgur.com/RiCnpcW.png)