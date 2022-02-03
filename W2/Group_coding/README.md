# 團體開發實作作業 (Group 2)

## 客製化區塊鏈

### 參數
開發私有鏈可以降低 difficulty 把出塊難度降低
```
GENESIS_PARAMS = {
    'difficulty': 1,
    "timestamp": 1638366284,
    "gas_limit": 3141592,
}
```
### balance
![image](https://user-images.githubusercontent.com/70627447/147410404-58c7a9cf-3672-45fc-875f-40279e8c1b21.png)
### timestamp
![image](https://user-images.githubusercontent.com/70627447/147410414-78a93f65-be3c-4ddb-90bb-09e411abd89a.png)





## mining process
照著文檔跑就可以了
```
from eth import constants
from eth.consensus.pow import mine_pow_nonce
from eth.chains.base import MiningChain
from eth.vm.forks.byzantium import ByzantiumVM
from eth.db.atomic import AtomicDB

GENESIS_PARAMS = {
      'difficulty': 1,
      'gas_limit': 3141592,
      'timestamp': 1638366284,
  }

klass = MiningChain.configure(
    __name__='TestChain',
    vm_configuration=(
        (constants.GENESIS_BLOCK_NUMBER, ByzantiumVM),
    ))
chain = klass.from_genesis(AtomicDB(), GENESIS_PARAMS)

block_result = chain.get_vm().finalize_block(chain.get_block())
block = block_result.block


# nonce and mix_hash for this block
nonce, mix_hash = mine_pow_nonce(
    block.number,
    block.header.mining_hash,
    block.header.difficulty)

block = chain.mine_block(mix_hash=mix_hash, nonce=nonce)

return str(block)
```
## result
![image](https://user-images.githubusercontent.com/70627447/147411114-2df15cd7-1975-4fff-9bf4-52c678d4ccf4.png)



