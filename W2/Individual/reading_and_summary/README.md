# 閱讀資料 Summary
## 1. [Ethereum Hard Fork Bug that split Ethereum’s chain in two](https://www.coindesk.com/tech/2020/11/11/ethereums-unannounced-hard-fork-was-trying-to-prevent-the-very-disruption-it-caused/)
### Summary
- 2020-11-11 以太坊發生共識問題，使以太坊硬分叉一分為二，遭到以太坊使用者質疑
- Geth 團隊修補漏洞的新版本 (v1.9.17) 會改變共識機制，但大部分礦工不知情而沒有更新節點，鏈上礦工們的新舊版本差異導致了以太坊硬分叉 (在 block #11234873 被觸發)
- Twitter冒出許多反對聲音，主要在討論 2 點「Geth 團隊為何單方面進行"共識升級"？」「為何 Geth 團隊默默發布修復程序而不是警告大家」
- 新版本 (v1.9.17) 沒有創建任何以社群不知道或不同意的新規則。這些規則在 EIP-211 中定義，並得到3年前得到社群同意，換言之，新版本並不是共識升級，而是將過去程序中的共識錯誤進行修復。
- Geth 團隊認為，這個重大漏洞需要更改共識，讓以太坊硬分叉升級，然而硬分叉需要耗費大量時間(數週、數月)，通知所有礦工更新，如果將此消息公布，反而會增加駭客攻擊的風險，所以 Geth 團隊選擇暗中推送更新作為最小化風險的方式

### How to prevent
# 與主要的節點提供者(Ex. Infura、Alchemy) 建立有效的溝通橋樑，使重大消息能夠即使反應
# 建立舊版本停止提供服務的機制(Ex. Zcash Deprecation Policy 新版本發布後大約 16 週(基於 block height)自動停止)

## 2. [How to retrieve tokens stuck in a crowdsale?](https://forum.openzeppelin.com/t/how-to-retrieve-tokens-stuck-in-a-crowdsale/3959)
### Summary
- 一份眾籌功能的智能合約收到非指定的 token 想要退還給投資者
- 該合約已經部署上鏈，且沒有實作退還代幣方法，這些代幣將永存在合約內

### How to prevent
- 需要縝密思考所有可能的 case (Ex. 此例需要退款其他 ERC20 代幣)，並實作 ERC 介面相關方法
- 使用 openzeppelin 提供的 SafeERC20 內的 `safeTransfer` function

