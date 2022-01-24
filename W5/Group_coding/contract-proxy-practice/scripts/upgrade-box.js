// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  const box = await upgrades.upgradeProxy(process.env.BOX_PROXY_ADDRESS, BoxV2);
  console.log("Box upgraded");
}

main();
