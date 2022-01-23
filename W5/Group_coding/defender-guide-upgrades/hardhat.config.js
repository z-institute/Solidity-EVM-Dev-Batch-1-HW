require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("@openzeppelin/hardhat-defender");

const mnemonic = process.env.MNEMONIC;
const alchemyApiKey = process.env.ALCHEMY_API_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defender: {
        apiKey: process.env.DEFENDER_TEAM_API_KEY,
        apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY,
    },
    networks: {
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
            accounts: { mnemonic },
        },
    },
    solidity: '0.7.3',
};