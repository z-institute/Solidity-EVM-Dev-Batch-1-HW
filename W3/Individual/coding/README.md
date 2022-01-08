## Mainnet Forking

You can start an instance of Hardhat Network that forks mainnet. This means that it will simulate having the same state as mainnet, but it will work as a local development network. That way you can interact with deployed protocols and test complex interactions locally.

To use this feature you need to connect to an archive node. We recommend using Alchemy (opens new window).

#Forking from mainnet
The easiest way to try this feature is to start a node from the command line:

```
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key>
```

You can also configure Hardhat Network to always do this:

networks: {
hardhat: {
forking: {
url: "https://eth-mainnet.alchemyapi.io/v2/<key>",
}
}
}
(Note that you'll need to replace the <key> component of the URL with your personal Alchemy API key.)

By accessing any state that exists on mainnet, Hardhat Network will pull the data and expose it transparently as if it was available locally.

#Pinning a block
Hardhat Network will by default fork from the latest mainnet block. While this might be practical depending on the context, to set up a test suite that depends on forking we recommend forking from a specific block number.

There are two reasons for this:

The state your tests run against may change between runs. This could cause your tests or scripts to behave differently.
Pinning enables caching. Every time data is fetched from mainnet, Hardhat Network caches it on disk to speed up future access. If you don't pin the block, there's going to be new data with each new block and the cache won't be useful. We measured up to 20x speed improvements with block pinning.
You will need access to a node with archival data for this to work. This is why we recommend Alchemy (opens new window), since their free plans include archival data.

### Get accounts

```
npx hardhat accounts
```

output:

0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
0x70997970C51812dc3A010C7d01b50e0d17dc79C8
0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
0x90F79bf6EB2c4f870365E785982E1f101E93b906
0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
0x976EA74026E726554dB657fA54763abd0C3a0aa9
0x14dC79964da2C08b23698B3D3cc7Ca32193d9955
0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
0xBcd4042DE499D14e55001CcbB24a551F3b954096
0x71bE63f3384f5fb98995898A86B02Fb2426c5788
0xFABB0ac9d68B0B445fB7357272Ff202C5651694a
0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec
0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097
0xcd3B766CCDd6AE721141F452C550Ca635964ce71
0x2546BcD3c84621e976D8185a91A922aE77ECEc30
0xbDA5747bFD65F08deb54cb465eB87D40e51B197E
0xdD2FD4581271e230360230F9337D5c0430Bf44C0
0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199

### Compile contract

```
npx hardhat compile
```

### Test contract

```
npx hardhat test
```

### Deploy Contract

```
npx hardhat run scripts/sample-script.js
```
