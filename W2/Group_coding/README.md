# 客製化自己的區塊鏈

1. script
```python=
from eth import constants, Chain
from eth.vm.forks.frontier import FrontierVM
from eth.vm.forks.homestead import HomesteadVM
from eth.chains.mainnet import HOMESTEAD_MAINNET_BLOCK
from eth.db.atomic import AtomicDB
from eth.chains.mainnet import MAINNET_GENESIS_HEADER
from eth_keys import keys
from eth import constants
from eth.chains.mainnet import MainnetChain
from eth.db.atomic import AtomicDB
from eth_utils import to_wei, encode_hex

chain_class = Chain.configure(
    __name__='Test Chain',
    vm_configuration=(
        (constants.GENESIS_BLOCK_NUMBER, FrontierVM),
        (HOMESTEAD_MAINNET_BLOCK, HomesteadVM),
    ),
)


# start a fresh in-memory db
# initialize a fresh chain
chain = chain_class.from_genesis_header(AtomicDB(), MAINNET_GENESIS_HEADER)

# Giving funds to some address
SOME_ADDRESS = b'\x85\x82\xa2\x89V\xb9%\x93M\x03\xdd\xb4Xu\xe1\x8e\x85\x93\x12\xc1'
GENESIS_STATE = {
    SOME_ADDRESS: {
        "balance": to_wei(10000, 'ether'),
        "nonce": 0,
        "code": b'',
        "storage": {}
    }
}

GENESIS_PARAMS = {
    'difficulty': constants.GENESIS_DIFFICULTY,
}

chain = MainnetChain.from_genesis(AtomicDB(), GENESIS_PARAMS, GENESIS_STATE)

current_vm = chain.get_vm()
state = current_vm.state


print("The balance of address {}".format(state.get_balance(SOME_ADDRESS)))
```


2. 更改變數
GENESIS_PARAMS = { 'difficulty': constants.GENESIS_DIFFICULTY, 'gas_limit': 3141592, }

------------
Understanding the mining process
1. copy the complete script from the link and run.

------------
加分題

![](https://i.imgur.com/rxN46Gc.png)




