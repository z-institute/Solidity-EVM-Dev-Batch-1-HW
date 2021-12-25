#### 1.下載hardhat
```
npm install --save-dev hardhat
npm install --save-dev @tenderly/hardhat-tenderly
```

#### 2.windows到官網下載tenderly.exe 放在資料夾

#### 3.系統提示有缺hardhat-waffle
```
npm install --save-dev @nomiclabs/hardhat-waffle
```

#### 4.Deploy
```
npx hardhat run ./scripts/sample-script.js
```

#### 5.跑本機節點
```
npx hardhat node 跑local節點(root權限)
```

#### 6.export
npx hardhat run --network local scripts/sample-script.js

tenderly export init

tenderly export <tranctionhash>

*tenderly.yaml 專案如果設定錯誤可以整個刪掉重新修改

# Result
![](./picture.png)
![](./picture2.png)
