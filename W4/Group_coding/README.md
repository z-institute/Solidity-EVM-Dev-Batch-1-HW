# W4 團體作業 group 2
## 建立一個空的資料夾打開cmd，輸入以下指令
```
git clone https://github.com/opynfinance/GammaProtocol.git
cd GammaProtocol
npm i
```
![image](https://user-images.githubusercontent.com/70627447/149634868-03fcd970-89d4-4f41-b0b9-ff9aa19f9264.png)
## 編譯合約
```
npm run build
```
## 報錯
![image](https://user-images.githubusercontent.com/70627447/149634894-d280e731-afb8-4346-a9cd-448c9a875bb3.png)
## 這邊我猜應該是還沒安裝 truffle ，輸入以下指令 `npm install truffle` 後再編譯一次合約
![image](https://user-images.githubusercontent.com/70627447/149634957-23cdc44a-b703-4275-8295-63afc6569c88.png)
成功了

## 在`.gitignore`中添加兩行指令
```
.infuraOptimisimMainnetKey
.infuraArbitrumMainnetKey
```
## 設定 .alchemyOptimisimMainnetKey, .alchemyArbitrumMainnetKey
```
echo ${YOUR_ALCHEMY_OPTIMISM_KEY} > .infuraOptimisimMainnetKey
echo ${YOUR_ALCHEMY_ARBITRUM_KEY} > .infuraArbitrumMainnetKey
```

# 將 Optimisim 和 Arbitrum 新增到 package.json
```
{
    ...
    "scripts": {
        "ganache": "ganache-cli -d --port 8545 --defaultBalanceEther 500",
        "ganache:optimism-mainnet-fork": "ganache-cli -d --port 8545 --defaultBalanceEther 500 -f https://optimism-mainnet.infura.io/v3/$(cat .infuraOptimisimMainnetKey)",
        "ganache:arbitrum-mainnet-fork": "ganache-cli -d --port 8545 --defaultBalanceEther 500 -f https://arbitrum-mainnet.infura.io/v3/$(cat .infuraArbitrumMainnetKey)",
        ...
    }
}
```
## Optimism mainnet fork
```
npm run ganache:optimism-mainnet-fork
npm run test:unit
npm run test:inegration
```
error:
```
Error: Cannot find module 'C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\test\unit-tests\*.ts'
Require stack:
- C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\node_modules\mocha\lib\mocha.js
- C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\node_modules\mocha\index.js
- C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\build\cli.bundled.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\node_modules\mocha\lib\mocha.js:390:36
    at Array.forEach (<anonymous>)
    at Mocha.loadFiles (C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\node_modules\mocha\lib\mocha.js:387:14)
    at Mocha.run (C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\node_modules\mocha\lib\mocha.js:961:10)
    at C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\build\webpack:\packages\core\lib\testing\Test.js:157:1
    at new Promise (<anonymous>)
    at Object.run (C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\build\webpack:\packages\core\lib\testing\Test.js:156:1)
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at Object.module.exports [as run] (C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\build\webpack:\packages\core\lib\commands\test\run.js:56:1)
    at Command.run (C:\Users\Samuel Cheng\Desktop\solidity\W4\Opyn mainnet fork\GammaProtocol\node_modules\truffle\build\webpack:\packages\core\lib\command.js:189:1)
Truffle v5.4.29 (core: 5.4.29)
Node v16.13.1
```
