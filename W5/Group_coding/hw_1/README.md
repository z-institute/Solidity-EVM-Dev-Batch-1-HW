# Step
follow [guide](https://docs.openzeppelin.com/defender/guide-upgrades)

## deploy box contract
![](./screenshots/deploy.png)

## transfer contract ownership from deployer to gnosis multi-sig contract 
![](./screenshots/transfer-ownership.png)

## propose to upgrade contract from  Box to BoxV2
![](./screenshots/propose-upgrade.png)

## click defender dashboard url and approve proposal
![](./screenshots/propose-upgrade-apprval-pending-dashborad.png)

## confirm to execute 
![](./screenshots/propose-upgrade-execute-confirm.png)

## upgrade successfully
![](./screenshots/propose-upgrade-executed.png)

# Note
- Upgrade contract mechanism:
  - parameterize
  - social yeet / migration
  - proxy pattern 
- Upgrade by single entity is not decentralize
- Proxy contract store state, Implementation contract store logic
- Use initialize function instead of the constructor