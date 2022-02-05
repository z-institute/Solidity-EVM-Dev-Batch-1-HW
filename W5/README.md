# W5 作業

## 1. 實作uups
```
// test/MyToken.test.js

// 所有區塊鏈的操作都需要加上 async、await ，等待回傳值
// 用 ether 這個 library 拿到 MyTokenV1 編譯出來的結果

const { ethers, upgrades } = require('hardhat');

describe('MyToken', function () {
  it('deploys', async function () {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
    //await MyTokenV1.deploy();

    // 將 deploy 的參數回傳到 proxy 裡面
    const proxy = await upgrades.deployProxy(MyTokenV1 , { kind: 'uups' });
    // 印出 proxy 的地址確認合約是否部屬成功
    console.log(proxy.address);

    ///(部屬要更新的 V2 logic contract)
    // 拿 MyTokenV2 編譯後的檔案 
    const MyTokenV2 = await ethers.getContractFactory('MyTokenV2');
    // deploy
    await upgrades.upgradeProxy(proxy.address , MyTokenV2);
    console.log(proxy.address);


  });
});


// 在終端輸入 npx hardhat compile 編譯
```
![image](https://user-images.githubusercontent.com/70627447/150664061-3bdd051f-edb5-4326-9341-375efaa5dbaf.png)

