輸入 `npx hardhat init` 可以初始化，不過這個練習是要從頭setup所以不執行

# 建立檔案 hardhat.config.js
```
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
```
所有在 hardhat.config.js import 的 library 都會自動導入到所有的 javascript file

```
module.exports = {
  solidity: "0.8.3",
};
```
指定 solidity 版本，避免出現編譯錯誤

# 建立 contract 資料夾
在 contract 資料夾下面創建 MyTokenV1.sol
```
// contracts/MyTokenV1.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract MyTokenV1 is Initializable, ERC20Upgradeable {
    function initialize() initializer public {
      __ERC20_init("MyToken", "MTK");

      _mint(msg.sender, 1000 * 10 ** decimals());
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}
}
```
# 建立 test 資料夾
MyTokenV1.test.js (test 的命名邏輯是 contract名稱.test.js)
所有區塊鏈的操作都需要加上 async、await ，等待回傳值

```
// test/MyToken.test.js

const { ethers, upgrades } = require('hardhat');

describe('MyToken', function () {
  it('deploys', async function () {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
    await MyTokenV1.deploy();
  });
});
```
