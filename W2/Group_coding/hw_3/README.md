# 程式碼步驟簡易說明 

- install tenderly
```shell
brew tap tenderly/tenderly
brew install tenderly
```

- create a package.json file
```shell
npm init -y
```

- install dependencies
```shell
npm install --save-dev hardhat @tenderly/hardhat-tenderly
```

- init hardhat env
```shell
npx hardhat 
```

- add following line to `hardhat.config.js`
```javascript
require("@tenderly/hardhat-tenderly")
```
- add following line to `scripts/sample-script.js` line 22
```javascript
  await hre.tenderly.persistArtifacts({
    name: "Greeter",
    address: greeter.address
  });
```
- login tenderly
```shell
tenderly login
```

- start local node
```shell
npx hardhat node
```

- deploy contract to local node
```shell
npx hardhat run --network local scripts/sample-script.js
```

- tenderly export set up  
```shell
tenderly export init
```

- export transaction to tenderly
```shell
tenderly export ${YOUR_TRANSACTION}
```

- [check tenderly dashboard](https://dashboard.tenderly.co/)

# Output 截圖
![](./screenshots/w2_group_coding_hw_2-1.png)
![](./screenshots/w2_group_coding_hw_2-2.png)
