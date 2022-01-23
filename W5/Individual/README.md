# UUPS Proxies

Error:
![](UUPS1.png)

解決辦法: solidity compiler 改回 "0.8.2"
![](UUPS2.png)

# Chainlink VRF

![](VRF1.png)
![](VRF2.png)

運作原理:
1. 向 Chainlink 要求隨機數
2. Chainlink 的中心化 JavaScript 監聽到要求
3. VRF Coordinator 執行 fulfillRandomnessRequest() 提供隨機數
