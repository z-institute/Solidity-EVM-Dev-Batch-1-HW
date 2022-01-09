# 3.自動化及優化
  a. script
```js
start.sh
--------
  ps aux | grep ganache-cli | awk '{print $2}' | xargs kill -9
  rm nohup.out
  nohup ganache-cli --fork https://mainnet.infura.io/v3/128da609d4284200abfb61efc6ebc545 --chainId 1 -h 0.0.0.0 &

用 linux 的 cron 在每天凌晨重啟節點
crontab
-------
  0 0     * * *   root    ~/.start.sh
```
