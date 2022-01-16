# ChainShot
## Introduction to Solidity
![](screenshots/chainshot.png)

# CryptoZombie
## Solidity Path: Beginner to Intermediate Smart Contracts
![](screenshots/cryptozombie-beginner-to-intermediate.png)
## Advanced Solidity Path: Get In-depth Knowledge
![](screenshots/cryptozombie-advance.png)

# Note
- `uint` is an alias for `uint256`
- `string` arbitrary length `UTF-8`
- `public` variable will automatically create a `getter` function
- Normally there's no benefit to using these sub-types because Solidity reserves 256 bits of storage regardless of the `uint` size. For example, using `uint8` instead of `uint` (`uint256`) won't save you any gas.
- If a `view` function is called internally from another function in the same contract that is **not** a `view` function, it will still cost gas. This is because the other function creates a transaction on Ethereum, and will still need to be verified from every node. So `view` functions are only free when they're called externally.
- If a function is not marked `payable` and you try to send Ether to it as above, the function will reject your transaction.