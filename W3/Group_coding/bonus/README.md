# Mainnet fork with Linode


## Linode RPC infomation:
```
NAME: 194.195.123.201
RPC URL: http://194.195.123.201:8545
Chain ID: 1
```
![](./pic1.jpg)
![](./pic2.jpg)

## 自動化重啟
1. install `ganache`
```
~# npm install -g ganache@latest
```

2. install `pm2`, npm project
```
~# npm install -g pm2
```

3. create file `ganache.js` (reference file: [`ganache.js`](./ganache.js))
```
const ganache = require('ganache');
const server = ganache.server({
  fork: {
    url: 'https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545',
  },
  chain: {
    chainId: 1
  }
});
const provider = server.provider;
const PORT = 8545;
server.listen(PORT, '0.0.0.0', (err) => {
  if (err) throw err;

  console.log(`ganache listening on port ${PORT}...`);
  provider
    .request({ method: "personal_listAccounts", params:[] })
    .then((accounts) => {
      console.log(accounts);
    });
});

provider.on('message' , msg => {
  console.log(msg);
});
```

4. create file `ecosystem.config.js` (reference file: [`ecosystem.config.js`](./ecosystem.config.js))
and set `0 0 * * *` in `cron_restart`, means restart script every day midnight
```
module.exports = {
    apps : [{
      name   : "ganache",
      script : "ganache.js",
      cron_restart: "0 0 * * *",
    }],
}
```

5. run pm2 ecosystem file
```
~# pm2 start ecosystem.config.js
```
![](./pic3.jpg)


## 優化
發現以下幾個專案能夠幫助開發：

1. [Godmode Ganache](https://github.com/martinetlee/godmode-for-test)
可以在 Mainnet fork 獲得特定合約的操作權限、修改 state 等
該專案提供以下項目的範例：
- MakerDao
- Uniswap
- Compound

此專案能夠提供開發過程中更多的測試條件

2. [ganache-jest-example](https://github.com/adrianmcli/ganache-jest-example)
整合 `Jest` 、 `Ganache` ，提供輕量級的測試環境，幫助智能合約的開發。