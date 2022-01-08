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

To pin the block number:
