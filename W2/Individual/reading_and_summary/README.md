# 閱讀資料 Summary
## 1. [Ethereum Hard Fork Bug that split Ethereum’s chain in two](https://www.coindesk.com/tech/2020/11/11/ethereums-unannounced-hard-fork-was-trying-to-prevent-the-very-disruption-it-caused/)
### summary
- Ethereum 因為怕漏洞被利用而偷偷的更新 Go Ethereum Client 沒有告知節點提供者
- 多數節點認為是小更新沒有跟進，導致 Ethereum 分叉以及依賴 Infura 的 Dapp 出現問題
- 此事件引發 Ethereum 透明度以及信任

### how to prevent
- 與節點提供者建立溝通管道
- 建立利用漏洞的懲罰機制

## 2. [How to retrieve tokens stuck in a crowdsale?](https://forum.openzeppelin.com/t/how-to-retrieve-tokens-stuck-in-a-crowdsale/3959)
### summary
- 眾籌合約收到非指定的 token 想要退還給投資者 
- 合約已經部署 mainnet 且未實作安全機制，導致 token 卡在合約內無法退還

### how to prevent
- 寫足夠多的測試程式，並且在部署 mainnet 前先在 mainnet fork 測試
- 使用 openzeppelin 提供的 SafeERC20 內的 `safeTransfer` function
- 實作 ERC165 確認合約是否有 `withdrawToOwner` function
