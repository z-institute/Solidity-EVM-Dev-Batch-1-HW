# Difference of solidity between Ethereum and Hedera
- Different Gas Cost [document](https://docs.hedera.com/guides/core-concepts/smart-contracts/hyperledger-besu-evm)
- Different meaning built-in global variable and opcodes [document](https://docs.hedera.com/guides/core-concepts/smart-contracts/solidity-variables-and-opcodes)
- Hedera has out of box services (HTS, HCS, smart contract service) to easily integrate
- Hedera SDK is easy to interact node, hedera services, smart contract

|                     | Ethereum         | Hedera |
|---------------------|------------------|--------|
| Gas Fee Predictable | X                | O      |
| Gas Fee             | High             | Low    |
 | Transaction Speed   | Slow             | Fast   |
 | TPS                 | 12+              | 10k+   |
 | Transaction Ordering| Decided by Miner | FCFS   |




## Reference
- hedera smart contract [document](https://docs.hedera.com/guides/core-concepts/smart-contracts)
- hedera official [website](https://hedera.com/smart-contract)