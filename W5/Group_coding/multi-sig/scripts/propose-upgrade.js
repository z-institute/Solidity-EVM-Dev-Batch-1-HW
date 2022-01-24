// scripts/propose-upgrade.js
const { defender } = require("hardhat");

async function main() {
  const proxyAddress = '0x21ca9abE2d257dFfa0bf8389D8A1D3e6803cD938';

  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("Preparing proposal...");
  const proposal = await defender.proposeUpgrade(proxyAddress, BoxV2);
  console.log("Upgrade proposal created at:", proposal.url);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })