require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/ao8sfJ4UBAeDtGmIyxM2NZiUpvlTigsK",
        blockNumber: 11095000
      }
    }
  }
};


