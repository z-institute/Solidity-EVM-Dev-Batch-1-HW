# [Week6] Homework

1.TRUFFLE SUITE TUTORIAL

### 安裝環境
執行以下命令安裝 Truffle：
```sh
npm install -g truffle
```
使用版本命令確認是否安裝完成：
```sh
truffle version
```
若正確安裝後會得到以下訊息：
```
Truffle v5.4.27 (core: 5.4.27)
Solidity v0.5.16 (solc-js)
Node v16.13.1
Web3.js v1.5.3
```
接著需要有一個測試用的本地私鏈, 可以使用 [Ganache](https://trufflesuite.com/ganache/) 來達成, 安裝後按下 Qucikstart 即可：
![](https://i.imgur.com/8ljPHzW.png)

建立並移動到專案資料夾：
```
mkdir pet-shop-tutorial
cd pet-shop-tutorial
```

執行 unbox 命令：
```sh
truffle unbox pet-shop
```
### 編寫智能合約
在 contracts 資料夾建立 Adoption.sol 並新增內容：
```solidity=
pragma solidity ^0.5.0;

contract Adoption {

}
```
在 contract Adoption { 中加入程式碼：
```solidity=
address[16] public adopters;
```

增加領養功能：
```solidity=
// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}
```
再增加 retrieve 功能到下方：

```solidity=
// Retrieving the adopters
function getAdopters() public view returns (address[16] memory) {
  return adopters;
}
```

完成後存檔即可執行 compile：
```sh
truffle compile
```
![](https://i.imgur.com/MbYeoQf.png)

### Migration
在專案中的 migrations/ 資料夾建立 2_deploy_contracts.js 檔案, 並輸入程式碼：
```js
var Adoption = artifacts.require("Adoption");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
};
```
再次確定前面安裝的 Ganache 已經開始運作：
![](https://i.imgur.com/18R0a96.png)

執行命令：
```sh
truffle migrate
```

這時候會出現以下錯誤：
![](https://i.imgur.com/uy3vhE9.png)

範例 2_deploy_contracts.js 中的程式碼應為如下：

```js
var Adoption = artifacts.require("Adoption.sol");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
};
```
成功 migrate 後會看到：
![](https://i.imgur.com/LQZ0RKs.png)

### 建立 UI 介面與智能合約互動
使用文字編輯器 (如 VScode) 打開檔案 /src/js/app.js, 找到 initWeb3 區塊用以下程式碼取代原本註解的文字：

```js
// Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });;
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);
```
再找到 initContract 區塊用以下程式碼取代：
```js
$.getJSON('Adoption.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with @truffle/contract
  var AdoptionArtifact = data;
  App.contracts.Adoption = TruffleContract(AdoptionArtifact);

  // Set the provider for our contract
  App.contracts.Adoption.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  return App.markAdopted();
});
```
取代 markAdopted 區塊中的註解：
```js
var adoptionInstance;

App.contracts.Adoption.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
```
handleAdopt 區塊：
```js
var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
```
### 使用瀏覽器與 dapp 互動

設定小狐狸 RPC 位址：
![](https://i.imgur.com/vQHnDOG.png)

將 Ganache 建立的測試錢包加入小狐狸：
![](https://i.imgur.com/xCz8L3D.png)

回到命令列執行網頁伺服器：
```sh
npm run dev
```

在網頁連接小狐狸錢包後即可互動：
![](https://i.imgur.com/P85fQAC.png)
![](https://i.imgur.com/eWFOeUZ.png)

## Hardhat：mainnet fork
建立專案資料夾並移動：
```sh
mkdir week3g3
```
建立 hardhat 專案：
```sh
npx hardhat
```
選擇 Basic：
![](https://i.imgur.com/hcyGWOz.png)


設定節點, 這裡使用 [infura](https://infura.io/) 的服務：
```
npx hardhat node --fork https://mainnet.infura.io/v3/<key>
```

接著會看到：
![](https://i.imgur.com/UNijGHk.png)


也可以直接指定要分叉的區塊高度：
```
npx hardhat node --fork https://mainnet.infura.io/v3/<key> --fork-block-number 11100000
```

但是由於 infura 只能取用目前的區塊狀態, 所以不能分叉指定高度, 會出現以下錯誤, 只能使用本機節點或是使用 [Alchemy](https://www.alchemy.com/) 服務：
```
Error HH604: Error running JSON-RPC server: project ID does not have access to archive state
```

開啟小狐狸錢包並設定自訂網路：
![](https://i.imgur.com/0Foolsg.png)

將測試用帳號私鑰匯入錢包：
![](https://i.imgur.com/8umhYRr.png)

## ganache-cli：mainnet fork
建立好專案資料夾後, 執行 ganache-cli：
```
ganache-cli -d -f https://mainnet.infura.io/v3/<key> -p 7545 --defaultBalanceEther 20
```
啟動後會出現以下畫面：
![](https://i.imgur.com/xxVgRJc.png)

接著就可以開啟小狐狸錢包自訂 RPC, 剛才 Ganache 開的 port 為 7545：
![](https://i.imgur.com/vQHnDOG.png)

相同地將私鑰匯入後即可操作：
![](https://i.imgur.com/p154RaM.png)

操作轉帳：
![](https://i.imgur.com/E3qfp9U.png)


