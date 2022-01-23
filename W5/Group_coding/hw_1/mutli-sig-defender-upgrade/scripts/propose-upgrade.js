// scripts/propose-upgrade.js
const { defender } = require("hardhat");

async function main() {
    const proxyAddress = '0x3dC5b3Ba17599d285Ac9A6436DE636D05B4D0Ac0';

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