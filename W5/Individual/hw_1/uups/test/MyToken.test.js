const { ethers, upgrades } = require('hardhat');
const { expect, assert } = require("chai");

describe('Upgradable MyToken', async function () {
    let owner, myTokenV1, myTokenV2;
    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
        // deploy version 1
        myTokenV1 = await upgrades.deployProxy(MyTokenV1, { kind: 'uups' });
        const MyTokenV2 = await ethers.getContractFactory('MyTokenV2');
        // deploy version 2  mintable
        myTokenV2 = await upgrades.upgradeProxy(myTokenV1.address, MyTokenV2);
    });
    describe('MyTokenV1', async function() {
        it('Should not be mintable', async function() {
            assert.isUndefined(myTokenV1.mint);
        })
    })
    describe('MyTokenV2', async function() {
        it('Should be mintable', async function () {
            assert.isFunction(myTokenV2.mint);
        })
    })

    describe('Mint', async function() {
        it('Should mint 1000 token to owner', async function() {
            const mintAmount = 1000;
            expect((await myTokenV2.balanceOf(owner.address)).toNumber()).to.equal(0);
            await myTokenV2.mint(owner.address, mintAmount);
            expect((await myTokenV2.balanceOf(owner.address)).toNumber()).to.equal(mintAmount);
        })
    })
});