# 程式碼步驟簡易說明
To isolate the local environment, using docker workflow.
## Set Up
- create nodejs Dockerfile
```shell
cat << EOF > Dockerfile
ARG NODEJS_VERSION
FROM node:\${NODEJS_VERSION}-alpine as local
EOF
```

- create docker-compose.yaml
```shell
cat << EOF > docker-compose.yaml
version: "3.8"
services:
  w3_individual_coding:
    container_name: w3_individual_coding
    tty: true
    stdin_open: true
    working_dir: /app
    entrypoint: /bin/sh
    build:
      context: .
      args:
        - NODEJS_VERSION=gallium
    volumes:
      - ./:/app
EOF
```
- run docker
```shell
docker-compose up -d 
```

- start nodejs container sh session
```shell
docker exec -it w3_individual_coding
```

- init project
```shell
npm init -y
```


- 
## tools

### hardhat
Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software.
- install hardhat
```shell
npm install --save-dev hardhat
```

- init hardhat and select `Create an advanced sample project that uses TypeScript`
```shell
npx hardhat 
```

- list all out-of-box functions.
```shell
npx hardhat 
```

### solidity coverage
Code coverage for Solidity smart-contracts

- Beginning with v0.7.12, this tool supports Hardhat and runs directly on HardhatEVM.
```shell
npx hardhat coverage
```

- it will generate coverage report, open `/coverage/index.html` can see report.

### tenderly
Comprehensive Ethereum Developer Platform for real-time monitoring, alerting, debugging, and simulating Smart Contracts.

reference: [W2 Group Coding Homework](../../../W2/Group_coding/hw_3/README.md) 

### surya
Surya is an utility tool for smart contract systems. It provides a number of visual outputs and information about the contracts' structure.

- install surya
```shell
npm install --save-dev surya
```
- install graphviz
```shell
brew install graphviz 
```

- create reports directory
```shell
mkdir reports
```

- generate graph
```shell
npx surya graph contracts/**/*.sol | dot -Tpng > reports/MyContract.png
```

- generate markdown report
```shell
npx surya mdreport reports/report_outfile.md contracts/**/*.sol
```

### mythril 
Security analysis tool for EVM bytecode. Supports smart contracts built for Ethereum, Hedera, Quorum, Vechain, Roostock, Tron and other EVM-compatible blockchains.

- run analyze
```shell
docker run -v $(pwd):/tmp mythril/myth:0.22.26 analyze /tmp/contracts/Greeter.sol
```


## clean up containers
```shell
docker-compose down
```

[//]: # (# Output 截圖)

[//]: # (![]&#40;&#41;)

