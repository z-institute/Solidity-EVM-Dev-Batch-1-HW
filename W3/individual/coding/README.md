# Samuel🚀 Z21124002 第三周個人作業
### hardhat
### remix
### etherscan
### infura
### VS code

# 試用infura，創建帳號並建立一個project
![image](https://user-images.githubusercontent.com/70627447/148680320-38c3bf09-62d7-4300-a737-af05db13de46.png)



# 使用 hardhat

轉到一個空文件夾然後開始
```
mkdir Mainnet fork
cd Mainnet fork
```
安裝
```
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```
![image](https://user-images.githubusercontent.com/70627447/148530896-e2b5a9a6-3ac9-4129-b08f-9915e090e56e.png)

## 打開 readme 檔 ， 可以嘗試執行看看這幾個指令
![image](https://user-images.githubusercontent.com/70627447/148531488-51672b6a-9993-453c-9bb8-91ecc314b42c.png)

## 查看 account (npx hardhat accounts)

看一下hardhat.config.js文件，會發現任務的定義accounts
![S__2637846](https://user-images.githubusercontent.com/70627447/148531941-b0fffa10-6985-4a20-8326-62cd9ecc0e2a.jpg)

執行 npx hardhat accounts
```
npx hardhat accounts
```

![image](https://user-images.githubusercontent.com/70627447/148532114-f7b97f70-caa9-4602-a5a9-0d42d249af14.png)

## 編譯合約 (npx hardhat compile)
在 contract 目錄中可以找到 Greeter.sol
![image](https://user-images.githubusercontent.com/70627447/148533034-25eba09d-accb-4a0f-8d78-93dd3d9a9480.png)

執行指令以編譯它
```
npx hardhat compile
```

## 測試合約 (npx hardhat test)
test 目錄中可以找到 sample-test.js 檔案
![image](https://user-images.githubusercontent.com/70627447/148533309-f6de83a8-722c-4b9d-9637-64a5fd7cbec1.png)

打指令以測試合約
```
npx hardhat test
```
![image](https://user-images.githubusercontent.com/70627447/148533543-b89b7584-2b38-4e18-86f6-bb3a1afff222.png)

## 部屬合約 (node scripts/sample-script.js)
在 scripts/ 資料夾中可以發現部屬合約的代碼
![image](https://user-images.githubusercontent.com/70627447/148550697-cb3d44b8-8bd3-4054-a60a-2d79c38c4dda.png)
可以在命令提示字元中輸入以下指令啟動代碼
```
npx hardhat run scripts/sample-script.js
```
![image](https://user-images.githubusercontent.com/70627447/148550764-133b7381-9867-4c93-b4ba-b17d9fc5336f.png)
現在我們已成功部屬合約

## 將錢包或 APP 連到 Hardhap 網路
一般情況下，Hardhap 將啟動在 Hardhat Network 中，以便外部的客戶端能夠連結它
輸入以下指令
```
npx hardhat node
```
![image](https://user-images.githubusercontent.com/70627447/148551321-f5f3fafc-3875-452d-a486-ec05a2e9a0b6.png)
這將向 Hardhat Network 公開一個 JSON-RPC 接口。要使用它，請將錢包或應用程序連接到 `http://localhost:8545`
![image](https://user-images.githubusercontent.com/70627447/148553113-60c9ca59-936e-4b2d-a77f-03fa0067dfdb.png)


# 嘗試使用 Remix 部屬第一個智能合約到公共測試網上

前置步驟，先從水龍頭中拿取 goerli 測試網的ETH

然後打開 remix 可以看到這幾個資料夾
![image](https://user-images.githubusercontent.com/70627447/148629571-4e531bd0-cf41-4c94-9e9f-0773d517c74e.png)
開啟 storage.sol 並編輯合約
這邊使用網路上看到的計算機合約
```
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Calc {
    int private result;
    
    function add(int a, int b) public returns (int c) {
        result = a + b;
        c = result;
    }
    
    function min(int a, int b) public returns (int) {
        result = a - b;
        return result;
    }
    
    function mul(int a, int b) public returns (int) {
        result = a * b;
        return result;
    }
    
    function div(int a, int b) public returns (int) {
        result = a / b;
        return result;
    }
    
    function getResult() public view returns (int) {
        return result;
    }
}
```

按下編譯
![image](https://user-images.githubusercontent.com/70627447/148629648-e7820180-ac46-49bc-a06a-9ce9841e074c.png)

## 部屬上鏈
將環境切換成 `injected web3`，可以跟小狐狸錢包接在一起
接著按下 `deploy`
![image](https://user-images.githubusercontent.com/70627447/148629851-53ec46c1-9a45-4438-aef6-82902990910d.png)
合約部屬成功，可以在測試網上的etherscan看到部屬上去的合約
![image](https://user-images.githubusercontent.com/70627447/148630255-9b6968d9-4edb-44a6-8e1e-2a96c07cb11c.png)



# 試用etherscan
在etherscan上找到自己部屬的合約後點擊 contract 發現找不到自己的合約程式碼
![image](https://user-images.githubusercontent.com/70627447/148630266-90993c93-225e-470c-8e64-79051e5706e3.png)
為了讓大家都能看到我的合約，點選 verify
![image](https://user-images.githubusercontent.com/70627447/148630338-cd89b2af-f3a3-4564-8692-5c2f8a7d6b85.png)
按下 continue 後貼上合約
![image](https://user-images.githubusercontent.com/70627447/148630380-c584267d-ded2-435e-8e40-95f02af4fd89.png)
這時候就可以看到自己的合約代碼了

現在來試用看看自己的合約
回到 remix，計算3+5
![image](https://user-images.githubusercontent.com/70627447/148630432-6a848241-7914-4cb1-9dde-9c6594ff4fb1.png)
按下add送出交易
在etherscan上可以看到getResult顯示8
![image](https://user-images.githubusercontent.com/70627447/148630447-dc7d2872-58ac-4979-a191-48e2a95364c1.png)


# 在 VS code 中撰寫第一個智能合約

打開 VS code 並安裝 solidity extension
開啟一個資料夾並貼上剛剛的合約
![image](https://user-images.githubusercontent.com/70627447/148681549-a6cfd4ff-0827-4a67-8b49-38ca52c8176b.png)
按下編譯，出現error，
`note that nightly builds are considered to be strictly less than the released version`
![image](https://user-images.githubusercontent.com/70627447/148681589-c051ab99-6ceb-4b9d-9801-59653fc6ec43.png)
不知道為什麼好像一定要特定版本
把第一行改成這樣問題解決
`pragma solidity ^0.8.11;`  
合約編譯完成!



