1. 實作 Mainnet fork with hardhat，用 Ganache-cli 跑 local 的 ethereum mainnet fork 並 connect MetaMask
reference: https://hardhat.org/hardhat-network/guides/mainnet-forking.html
    1. 到 https://www.alchemy.com/ 註冊
    2. Apps -> view key 拿取key
    3. terminal run 
    ```
    npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key>
    ```
    ![](https://i.imgur.com/ssdtCVV.png)
    4. 連上 metamask
    如果新增網路，chain ID = 31337
    依照run出來的account新增帳戶
    再新增private key就會成功如下
    ![](https://i.imgur.com/ck20rAa.png)

2. optional
(unable to sign up Linode @@)
