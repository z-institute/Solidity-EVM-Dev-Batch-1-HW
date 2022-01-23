const { defender } = require("hardhat");

async function main() {
    const proxyAddress = '0x532B287258Fe7b02cE13B31461fE06FE441Fb287';

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