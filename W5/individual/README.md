### 1. Upgradeable Contract
contract
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyTokenV1 is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
  function initialize() initializer public {
    __ERC20_init("MyToken", "MTK");
    __Ownable_init();
    __UUPSUpgradeable_init();

    _mint(msg.sender, 1000 * 10 ** decimals());
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  // To authorize the owner to upgrade the contract we implement _authorizeUpgrade with the onlyOwner modifier.
  function _authorizeUpgrade(address) internal override onlyOwner {}
}
```
MyToken.test.js
```js
const { ethers, upgrades } = require('hardhat');

describe('MyToken', function () {
  it('deploys', async function () {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
    // await MyTokenV1.deploy();
    // 用 uups proxy deploy

    // step 1
    const proxy = await upgrades.deployProxy(MyTokenV1, { kind: 'uups' });  
    console.log(proxy.address);

    // step 2
    const MyTokenV2 =  await ethers.getContractFactory('MyTokenV1');
    // still using V1
    // eips.ethereum.org/EIPS/eip-1822

    // step 3
    await upgrades.upgradeProxy(proxy.address, MyTokenV2);
  });
});
```

   - 截圖 ![](./uups_1.png)

### 2. 試跑此專案提供成功跑起的 DApp 截圖，簡述 Chainlink VRF 運作原理


### 3. Follow 此教學並提供完成截圖，用自己的話寫下對 Uniswap V3 的運作模式理解
```
   We provide 0.09 ETH and want to receive 90 DAI in return.
   Then return 0.03078 ETH.
   So, we use 0.06 ETH to get 90DAI.
```   
   - 截圖 ![](./exactInput.png)
   - 截圖 ![](./exactInput_Metamask.png)
```
   We are providing 0.2 ETH and want to receive however much DAI we can get for it which happens to be 583 DAI.
```
   - 截圖 ![](./exactOutput.png)

   運作模式
```js
   Uniswap V3 沿習 V2 的做法，有 core, periphery 和 SDK，其中 core 為主要的核心合約群，periphery為輔助合約群，幫助前端存取 Core 合約，也就是這題作業所練習到的部份

   IUniswapRouter 為 periphery 合約群中的 Router interface，主要在做 token swapping function，在本題中，須完全實作其所有 function

   先以 IUniswapRouter 實作 Swap Router

   本份合約中的 function convertExactEthToDai() 須先完善 IUniswapRouter 裡的 struct ExactInputSingleParams 參數設置，做為 exactInputSingle 函數的 parameter，再實例化 exactInputSingle
   再把合約多餘的ETH，返還給 msg.sender refundETH()

   本份合約中的 function convertEthToExactDai() 須先完善 IUniswapRouter 裡的 struct ExactOutputSingleParams 參數設置，做為 exactOutputSingle 函數的 parameter，再實例化 exactOutputSingle
   再把合約多餘的ETH，返還給 msg.sender refundETH()
```

### 4. 閱讀 Solidity by example
