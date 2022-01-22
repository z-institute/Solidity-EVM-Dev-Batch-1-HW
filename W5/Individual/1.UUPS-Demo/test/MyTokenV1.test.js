const { ethers, upgrades } = require('hardhat');

describe('MyToken', function () {
  it('deploys', async function () {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');

    //s1
    const proxy = await upgrades.deployProxy(MyTokenV1, { kind: 'uups' });
    console.log(proxy.address);

    //s2
    const MyTokenV2 = await ethers.getContractFactory('MyTokenV2');

    //s3
    await upgrades.upgradeProxy(proxy.address, MyTokenV2);
    console.log(proxy.address);
  });
});