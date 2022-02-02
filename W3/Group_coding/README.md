# 實作 Mainnet fork with hardhat/Ganache-cli 

run local ethereum mainnet fork and connect MetaMask.


### 以hardhat run
reference: https://hardhat.org/hardhat-network/guides/mainnet-forking.html

1. 到 https://www.alchemy.com/ 註冊
2. Apps -> view key 拿取key
3. terminal run

```
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key>
```

![](https://i.imgur.com/ssdtCVV.png)

4. 連上 metamask

    如果新增網路，chain ID = 31337.
    metamask --> 匯入帳戶 --> 貼上run 出來的private key就會成功如下
![](https://i.imgur.com/ck20rAa.png)

### 以Ganache-cli run

```
ganache-cli -d -f https://eth-mainnet.alchemyapi.io/v2/<key> -p 7545
```
connect to metamask, chain ID = 1337.

![](https://i.imgur.com/9g8Wgq2.png)

![](https://i.imgur.com/rStPFnD.png)

![](https://i.imgur.com/HPRQ6k7.png)
