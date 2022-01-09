# 1. linode創建帳號
  N/A

# 2. 實作 Mainnet fork，用 Ganache-cli 跑 ethereum mainnet fork 並 connect MetaMask
```js
  $ nohup ganache-cli --fork https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545 --chainId 1 -h 0.0.0.0 &

  $ tail -f nohup.out

  $ curl 0.0.0.0:8545 -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
    {"id":83,"jsonrpc":"2.0","result":"0xd4fbf8"}
```

### MetaMask

  ![](./MetaMask.png)


# 3.自動化及優化
### a. script
```js
~/.start.sh
--------
  ps aux | grep ganache-cli | awk '{print $2}' | xargs kill -9
  rm nohup.out
  nohup ganache-cli --fork https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545 --chainId 1 -h 0.0.0.0 &

用 linux 的 cron 在每天凌晨重啟節點
crontab
-------
  0 0     * * *   root    ~/.start.sh
```

### b. 客製化這個 fork 還能如何優化
```js
  nohup ganache-cli --fork https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545 --chainId 1 -h 0.0.0.0 &
  以上的 mainnet fork，從 genesis block 開始 fork，但就應用而言，無須整條鏈的資料做 fork

  可透過以下參數來優化 mainnet fork
  1. 從特定Block fork，如下 Block 1234567
     nohup ganache-cli --fork https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545@1234567 --chainId 1 -h 0.0.0.0 &

  2. 從特定address fork，如下 Address 0x36383AC9171b5854503262B5B53Df562626302f9，可以模擬一個通常被鎖定以供使用的特定帳戶地址
     nohup ganache-cli --fork https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545 -u 0x36383AC9171b5854503262B5B53Df562626302f9 --chainId 1 -h 0.0.0.0 &
```
