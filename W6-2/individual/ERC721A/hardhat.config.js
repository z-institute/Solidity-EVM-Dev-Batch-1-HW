require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

if (process.env.REPORT_GAS) {
  require('hardhat-gas-reporter');
}

const ALCHEMY_API_KEY = '';
const RINKEBY_PRIVATE_KEY = '';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: '2B5ECCBS3H4YV8TYNQCSUY5GY1A39817AS',
    },
  },
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    showTimeSpent: true,
  },
};
