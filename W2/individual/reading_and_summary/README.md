# 閱讀資料 Summary
## 1. [Ethereum Hard Fork Bug that split Ethereum’s chain in two](https://www.coindesk.com/tech/2020/11/11/ethereums-unannounced-hard-fork-was-trying-to-prevent-the-very-disruption-it-caused/)
  - 這是一個兩難的決定
  - 披露該漏洞的風險太大，因此他們決定暗中推送更新以最小化風險，但忘了為節點運營商準備一份指南
  - 暗中推送Patch，已經違背了身為DAO組織的精神，就算最後沒有發生任何問題，仍然要尊重去中心化的精神
  - 可以在有防範的前提下，揭露漏洞，預告在哪個Block做升級，這樣才不會造成在Ethereum上交易的不信任，也能讓節點運營商能充份準備

## 2. [How to retrieve tokens stuck in a crowdsale?](https://forum.openzeppelin.com/t/how-to-retrieve-tokens-stuck-in-a-crowdsale/3959)
  - 為防止Token發送到non-support Token合約而造成資金損失的問題，合約添加 ERC165 的 instance (solidity 0.7以上版本)
  - 繼承 ERC165 的合約，能透過 ERC20 selector 檢查 type(IERC20).interfaceId
```
  require(test.supportsInterface(type(IERC20).interfaceId), 'Address is not supported');
```
  - 或建構子註冊 interface 類型
```
  _registerInterface(type(IERC20).interfaceId);
```
  - 之後實作成員函數 withdrawToOwner 時，transfer 就可以將任何 ERC-20 代幣發送到此智能合約，而不會丟失資金
```
  function withdrawToOwner(IERC20 token) {
    uint256 balance = token.balanceOf(address(this));

    require(balance > 0, "Contract has no balance");
    require(token.transfer(owner, balance), "Transfer failed");    
  }
```
  - 以下是實作成員函數 secureSendToken，確保我們不會將令牌發送到無效（不支持）地址
```
  function secureSendToken(IERC20 token, address to, uint256 amount) external {
    require( to.supportsInterface(type(IERC20).interfaceId), 'Address is not supported' );

    require(token.transfer(to, amount), "Transfer failed");
  }
```
