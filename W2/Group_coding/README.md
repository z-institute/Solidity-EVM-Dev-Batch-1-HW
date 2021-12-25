#Homework-1

GENESIS_STATE = {
    SOME_ADDRESS: {
        "balance": to_wei(20000, 'ether'),
        "nonce": 0,
        "code": b'',
        "storage": {}
    }
}

GENESIS_PARAMS = {
    'difficulty': constants.GENESIS_DIFFICULTY,
    'gas_limit': 3141592,
}



#Homework-2
# 程式碼步驟簡易說明
1.Update include path
from eth.chains.base import MiningChain
from eth.db.atomic import AtomicDB

2.run command 
  python3 mine_pow_nonce.py

3.result
 
# Output 截圖
![](./picture.png)

#加分題
![image](https://user-images.githubusercontent.com/7067720/147390927-c480e7bd-4178-48aa-b092-25baa50bf16d.png)
![image](https://user-images.githubusercontent.com/7067720/147391103-d3f2e321-3aed-45aa-baf9-38416344e91d.png)
