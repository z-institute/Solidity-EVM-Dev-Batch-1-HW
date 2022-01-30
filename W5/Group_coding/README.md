# Upgrading a contract via a multisig

![](multisig.png)

- Smart contracts in Ethereum are immutable by default. Once you create them there is no way to alter them, effectively acting as an unbreakable contract among participants.

- Upgradeable contracts allow us to alter a smart contract to fix a bug, add additional features, or simply to change the rules enforced by it.

- This allows us to change the contract code, while preserving the state, balance, and address.



The process of creating an upgradeable contract and later upgrading is as follows:

1. Create upgradeable contract. Development should include appropriate testing and auditing.

2. Deploy upgradeable contract. Deployment consists of implementation contract, ProxyAdmin and the proxy contract using OpenZeppelin Upgrades Plugins for Hardhat with a developer controlled private key.

3. Transfer control of upgrades (ownership of the ProxyAdmin) to a multisig. This means we can no longer upgrade locally on our machine.

4. (After a period of time) Create a new version of our implementation. Development should include appropriate testing and auditing.

5. Propose the upgrade. This checks the new implementation for upgrade safety, deploys the contract and creates a proposal.

6. Upgrade the contract. The required number of owners of the multisig need to approve and finally execute the upgrade.
