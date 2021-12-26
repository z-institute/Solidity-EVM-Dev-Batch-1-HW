# 閱讀資料 Summary

## 1. [Ethereum Hard Fork Bug that split Ethereum’s chain in two](https://www.coindesk.com/tech/2020/11/11/ethereums-unannounced-hard-fork-was-trying-to-prevent-the-very-disruption-it-caused/)

- 總結
  - Geth 團隊在較舊的更新中修補了共識錯誤但沒有明確公告

  - 有些節點認為只是小更新不值得為此停止他們的服務

  - 數月後導致乙太坊硬分岔讓這些結點的服務受到影響

  - Geth 團隊認為強調一個版本包含重要的共識或DoS修復將冒著被攻擊的風險才決定秘密推動

  - 透明度和揭露的風險是個兩難的問題

- 避免類似的問題

  - 可以跟一些主要的專案建立溝通的管道協調重要更新，將造成的影響降低。


## 2. [How to retrieve tokens stuck in a crowdsale?](https://forum.openzeppelin.com/t/how-to-retrieve-tokens-stuck-in-a-crowdsale/3959)

- 總結

  - 一但合約部署前沒寫好返還的機制，就沒救了。

- 避免類似的問題

  - `import "@openzeppelin/contracts/introspection/ERC165.sol";` 實現函數 : withdrawToOwnerwithdrawToOwner
  
  - `import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";` 實現函數 : safeTransfer
  
  - creat mainnet fork 先行測試
