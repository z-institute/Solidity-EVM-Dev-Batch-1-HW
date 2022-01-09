# Mainnet fork with hardhat

1.  Installation
```
npm install --save-dev hardhat
```

2. Create a sample project
```
npx hardhat
```

3. Forking from mainnet
```
npx hardhat node --fork https://mainnet.infura.io/v3/<key>
```

![](p1.png)

# 用 Ganache-cli 跑 local 的 ethereum mainnet fork 並 connect MetaMask

```
ganache-cli -f https://mainnet.infura.io/v3/<key> -p 7545 --defaultBalanceEther 5000
```

![](p2.png)
![](p3.png)
![](p4.png)

# mainnet fork with Linode
### 創建 linode 帳號並建立一台VM
![image](https://user-images.githubusercontent.com/70627447/148682304-c83033bc-35eb-4390-b479-5c23f86d447f.png)

### 打入以下指令
`curl (my_ip):8545 -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'`
### 結果
![image](https://user-images.githubusercontent.com/70627447/148694044-195bf159-e16f-4298-8e01-bdc91fc93b48.png)

### 連接小狐狸
![image](https://user-images.githubusercontent.com/70627447/148694031-20975bd8-6d4a-4816-8c00-1baf51cf0fb2.png)
