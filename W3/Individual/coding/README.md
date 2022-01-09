個人開發實作：任選上課時提到的五個（或以上）開發工具，並照著 Readme 試用看看，寫下簡易用法

### Remixd
install.
```
npm install -g @remix-project/remixd
```

uninstall old version.
```
npm uninstall -g remixd
```

share folders with online remix ide.
```
remixd -s <absolute-path> --remix-ide https://remix.ethereum.org
```

mac下npm指令有可能會有許多報錯，是因為原本安裝npm的user是指向root，須將權限改為當前用戶。

reference: https://github.com/ethereum/remix-project/tree/master/libs/remixd

---

### Hardhat

#### set up enviroment
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
nvm install 12
nvm use 12
nvm alias default 12
npm install npm --global # Upgrade npm to the latest version
```

如果當中出現 error code:
```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Failed to clone nvm repo. Please report this!
```
解決方法：
`xcode-select --install`

#### create a new Hardhat project
reference: https://hardhat.org/tutorial/creating-a-new-hardhat-project.html

#### writing and compiling contracts
reference: https://hardhat.org/tutorial/writing-and-compiling-contracts.html

#### testing contracts
reference: https://hardhat.org/tutorial/testing-contracts.html


---

### Metamask
1. 新增網路
2. Network Name （自定義）
3. RPC url
4. chain ID


---

### Truffle/ Ganache CLI
reference: https://github.com/trufflesuite/ganache/blob/develop/src/packages/ganache/README.md

```shell=
// to install

npm install ganache@beta --global
npm install ganache-cli@latest --global
ganache-cli
```


