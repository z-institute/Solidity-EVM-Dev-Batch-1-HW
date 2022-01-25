const { ethers, upgrades } = require("hardhat");

describe("MyToken", function () {
  it("deploys", async function () {
    const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");
    await upgrades.deployProxy(MyTokenV1, { kind: "uups" });
  });
});
