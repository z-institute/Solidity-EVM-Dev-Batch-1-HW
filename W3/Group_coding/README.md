# Samuel🚀 Z21124002 第三周第二組作業
# hardhat mainnet fork

創建一個 hardhat 資料夾並執行以下代碼安裝所需的 package

```
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

啟動主網分叉

```
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<my_key>
```
![image](https://user-images.githubusercontent.com/70627447/148559513-0bf9047d-aa5e-452d-8089-894f9bc6d757.png)

連接小狐狸錢包
![image](https://user-images.githubusercontent.com/70627447/148554665-2935417e-2e9c-4438-af82-a21070442bff.png)


# 用 Ganache-cli 跑 local 的 ethereum mainnet fork
```
npm install -g ganache-cli
ganache-cli -d -f https://mainnet.infura.io/v3/CnnOsipSpXn4KPQFG8mhKMK0n5pgYEqw -p 7545 --defaultBalanceEther 5000
```
error:
![image](https://user-images.githubusercontent.com/70627447/148682265-c642038b-0655-4c2b-b3ce-75d160410057.png)

將 hardhat config 檔案修改一下
```
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1
    }
  }
};
```
成功

# mainnet fork with Linode
### 創建 linode 帳號並建立一台VM
![image](https://user-images.githubusercontent.com/70627447/148682304-c83033bc-35eb-4390-b479-5c23f86d447f.png)

### 打入以下指令
`curl (my_ip):8545 -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'`
### 結果
![image](https://user-images.githubusercontent.com/70627447/148694044-195bf159-e16f-4298-8e01-bdc91fc93b48.png)

### 連接小狐狸
![image](https://user-images.githubusercontent.com/70627447/148694031-20975bd8-6d4a-4816-8c00-1baf51cf0fb2.png)


