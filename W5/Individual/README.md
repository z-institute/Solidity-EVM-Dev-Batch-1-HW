# [Week5] Homework

### 1. UUPS
![](https://i.imgur.com/Qd1gMOZ.png)

### 2. DApp:Never.Fight.Twice

過程中有出現以下 **Error: Cannot find module 'ethers'** 訊息, 安裝了該模組後即可正常運作：
```sh
npm install --save ethers
```

![](https://i.imgur.com/V3hDccu.jpg)

#### Chainlink VRF 運作原理

VRF (Verifiable Random Function) 為密碼學領域中的函式, 可以建立隨機且無法被預測的值, 而且可以驗證其隨機性。

流程如下：

![](https://i.imgur.com/IvaYZx1.png)
> 影像來源：https://www.leewayhertz.com/

1. 外部應用程式的智能合約對 Chainlink 發出隨機數驗證請求
2. Chainlink 透過 VRF 生成隨機數
3. 將隨機數發給 VRF 智能合約並進行隨機驗證
4. 回傳給外部應用程式的智能合約