1. 實作 Mainnet fork with hardhat，用 Ganache-cli 跑 local 的 ethereum mainnet fork 並 connect MetaMask.

1.1 以hardhat run
reference: https://hardhat.org/hardhat-network/guides/mainnet-forking.html

    step1. 到 https://www.alchemy.com/ 註冊
    step2. Apps -> view key 拿取key
    step3. terminal run 
    ```
    npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key>
    ```
    ![](https://i.imgur.com/ssdtCVV.png)

    step 4. 連上 metamask

    如果新增網路，chain ID = 31337，
    ![](https://i.imgur.com/kb1a17e.png)
    metamask --> 匯入帳戶 --> 貼上run 出來的private key就會成功如下
    ![](https://i.imgur.com/ck20rAa.png)

1.2 以Ganache-cli run

```
ganache-cli -d -f https://eth-mainnet.alchemyapi.io/v2/<key> -p 7545
```
connect to metamask, chain ID = 1337.
![](https://i.imgur.com/9g8Wgq2.png)
![](https://i.imgur.com/rStPFnD.png)

2. optional
(unable to sign up Linode @@)
