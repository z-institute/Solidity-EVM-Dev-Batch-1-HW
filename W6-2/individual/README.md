### 1. Follow 以下兩個教學並提供完成截圖
  A. 使用 golang 完成 Hedera Transfer hbar
    - Environment Setup
```js
      The account ID is = 0.0.26267618
      The private key is = 302e020100300506032b657004220420985f7564f45ae72b3177303d6cf70904edb38cc05d266bd0dc34e55b975fc04c
```
    - Create an account
```js
      The new account ID is 0.0.29591508
      The account balance for the new account is 1000
```
    - Transfer hbar
```js
      The transaction consensus status is SUCCESS
      The account balance query cost is: 0 tℏ
      The hbar account balance for this account is 2000
```
- hedera_examples.go ![](./hedera_examples_go.png)

  B. Create token
```js
    1. Configure our Client
    2. Grab 2nd account from our environment file
    3. Associate new account with new token
    4. Transfer tokens from "treasury" into our 2nd account
    5. Check the balance of our accounts
```
- hedera_nodejs_examples/index.js ![](./hedera_nodejs_examples.png)

### 2. 承上題，請用自己的話列出 Solidity 在 Ethereum 與 Hedera 的差異
  A. Solidity 在 Ethereum 上是原生的 smart contract 開發語言，有 OpenZeppelin 函式庫做為參考介面程式庫
     Solidity 在 Hedera 上是透過 HTS 函式庫做為參考介面程式庫
  B. Solidity 在 Ethereum 上是透過 abi.json 做為已編輯合約的參考
     Solidity 在 Hedera 上是透過 HTS.json 做為已編輯合約的參考
  C. Solidity 在 Ethereum 上是透過 web3.js 或 ethers.js 連接 json rpc，加簽之後，引用 smart contract 的 Bytecode
     Solidity 在 Hedera 上是透過 Java/Javascript/Go SDK，引用 smart contract 的 Bytecode
  D. Token, NFT 在 Hedera 上是原生數位資產，在 Ethereum 必須透過 Solidity 產生 ERC20, ERC721 合約

### 3. Follow 此教學寫下步驟並提供完成截圖，簡述 ERC721 與 ERC721A 的差別
