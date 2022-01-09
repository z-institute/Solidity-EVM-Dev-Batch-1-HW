# [Week3][Group3] Homework

## Hardhat：mainnet fork
建立專案資料夾並移動：
```sh
mkdir week3g3
```
建立 hardhat 專案：
```sh
npx hardhat
```
選擇 Basic：
![](https://i.imgur.com/hcyGWOz.png)


設定節點, 這裡使用 [infura](https://infura.io/) 的服務：
```
npx hardhat node --fork https://mainnet.infura.io/v3/<key>
```

接著會看到：
![](https://i.imgur.com/UNijGHk.png)


也可以直接指定要分叉的區塊高度：
```
npx hardhat node --fork https://mainnet.infura.io/v3/<key> --fork-block-number 11100000
```

但是由於 infura 只能取用目前的區塊狀態, 所以不能分叉指定高度, 會出現以下錯誤, 只能使用本機節點或是使用 [Alchemy](https://www.alchemy.com/) 服務：
```
Error HH604: Error running JSON-RPC server: project ID does not have access to archive state
```

開啟小狐狸錢包並設定自訂網路：
![](https://i.imgur.com/0Foolsg.png)

將測試用帳號私鑰匯入錢包：
![](https://i.imgur.com/8umhYRr.png)

## ganache-cli：mainnet fork
建立好專案資料夾後, 執行 ganache-cli：
```
ganache-cli -d -f https://mainnet.infura.io/v3/<key> -p 7545 --defaultBalanceEther 20
```
啟動後會出現以下畫面：
![](https://i.imgur.com/xxVgRJc.png)

接著就可以開啟小狐狸錢包自訂 RPC, 剛才 Ganache 開的 port 為 7545：
![](https://i.imgur.com/vQHnDOG.png)

相同地將私鑰匯入後即可操作：
![](https://i.imgur.com/p154RaM.png)

操作轉帳：
![](https://i.imgur.com/E3qfp9U.png)
