# Upgrading a contract via a multisig

1. create a new project by hardhat, 

2. a Hardhat project with Hardhat Upgrades plugin, Hardhat Defender, ethers.js and dotenv installed..
```
npm install --save-dev @openzeppelin/hardhat-upgrades @openzeppelin/hardhat-defender @nomiclabs/hardhat-ethers ethers doten
```

2. Create upgradeable contract
in this case, we have Box.sol

3. Deploy upgradeable contract
3.1. create deploy.js script for deploying.
3.2. create .env file for confidential parameters, and add .env parameters to hardhat.config.js
```
MNEMONIC="Enter your seed phrase"
ALCHEMY_API_KEY="Enter your Alchemy API Key"
DEFENDER_TEAM_API_KEY="Enter your Defender Team API Key"
DEFENDER_TEAM_API_SECRET_KEY="Enter your Defender Team API Secret"
```
3.3. run deploy.js and deploy to the Rinkeby network.
Our implementation contract, a ProxyAdmin and the proxy will be deployed.

```
npx hardhat run --network rinkeby scripts/deploy.js
```
![](https://i.imgur.com/i04PFbF.png)

4. Transfer control of upgrades to a multisig
4.1. create a safe via gnosis or Defender.
reference: 
https://help.gnosis-safe.io/en/articles/3876461-create-a-safe
https://defender.openzeppelin.com/
4.2. create transfer-ownership.js and replace gnosisSafe to your Gnosis Safe address.(address can be seen from left menu or url after rin:<safe address> )
![](https://i.imgur.com/09hxvBG.png)
    
4.3. run the transfer ownership code on the Rinkeby network.
```
npx hardhat run --network rinkeby scripts/transfer-ownership.js
```
![](https://i.imgur.com/UOAaai5.png)

5. crete a new version of our implementation
in this case we have BoxV2.sol

6. create Defender Team API key
copy and store our API Key and the Secret Key in our projects .env file, and update hardhat.config.js.

7. create propose-upgrade.js
propose-upgrade.js will assign the new contract to upgrade.
7.1. update proxyAddress. 
```
// scripts/propose-upgrade.js
const { defender } = require("hardhat");

async function main() {
  const proxyAddress = '0x444DBfA76f972D8BB6360c5e9d68083522dfDd33';

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

```
7.2. run script.
```
npx hardhat run --network rinkeby scripts/propose-upgrade.js
```    
    
8. go to Defender Admin and approve.
![](https://i.imgur.com/cO3Nsz3.jpg)

after approval
![](https://i.imgur.com/NNX5bVr.png)

![](https://i.imgur.com/3naFy9e.png)

reference: https://docs.openzeppelin.com/defender/guide-upgrades
