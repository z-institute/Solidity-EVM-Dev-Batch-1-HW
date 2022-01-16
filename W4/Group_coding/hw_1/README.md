# Set Up
- clone Opyn Protocol and install dependencies
```shell
git clone git@github.com:opynfinance/GammaProtocol.git && cd GammaProtocol && npm i
```
- add `Optimism` and `Arbitrum` alchemy key into `.gitignore`
```shell
.alchemyOptimisimMainnetKey
.alchemyArbitrumMainnetKey
```
- set `.alchemyOptimisimMainnetKey`, `.alchemyArbitrumMainnetKey`
```shell
echo ${YOUR_ALCHEMY_OPTIMISM_KEY} > .alchemyOptimisimMainnetKey
echo ${YOUR_ALCHEMY_ARBITRUM_KEY} > .alchemyArbitrumMainnetKey
```

- add `Optimism` and `Arbitrum` mainnet fork script into `package.json`
```json
{
    ...
    "scripts": {
        "ganache": "ganache-cli -d --port 8545 --defaultBalanceEther 500",
        "ganache:optimism-mainnet-fork": "ganache-cli -d --port 8545 --defaultBalanceEther 500 -f https://opt-mainnet.g.alchemy.com/v2/$(cat .alchemyOptimisimMainnetKey)",
        "ganache:arbitrum-mainnet-fork": "ganache-cli -d --port 8545 --defaultBalanceEther 500 -f https://arb-mainnet.g.alchemy.com/v2/$(cat .alchemyOptimisimMainnetKey)",
        ...
    }
}
```
- test in `Optimism` mainnet fork
```shell
npm run ganache:optimism-mainnet-fork
npm run test:unit
npm run test:inegration
```

- test in `Arbitrum` mainnet fork
```shell
npm run ganache:arbitrum-mainnet-fork
npm run test:unit
npm run test:inegration
```
