from eth_keys import keys
from eth import constants
from eth.chains.mainnet import MainnetChain
from eth.db.atomic import AtomicDB
from eth_utils import to_wei, encode_hex

# Giving funds to some address
SOME_ADDRESS = b'\x85\x82\xa2\x89V\xb9%\x93M\x03\xdd\xb4Xu\xe1\x8e\x85\x93\x12\xc1'
GENESIS_STATE = {
    SOME_ADDRESS: {
        "balance": to_wei(99, 'ether'),
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

print("The balance is {} wei".format(
    state.get_balance(SOME_ADDRESS)
))
