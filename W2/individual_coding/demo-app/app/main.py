from eth import constants
from eth.chains.mainnet import MainnetChain
from eth.db.atomic import AtomicDB

from eth_utils import to_wei, encode_hex

MOCK_ADDRESS = constants.ZERO_ADDRESS
DEFAULT_INITIAL_BALANCE = to_wei(10000, 'ether')

GENESIS_PARAMS = {
    'difficulty': constants.GENESIS_DIFFICULTY,
}

GENESIS_STATE = {
    MOCK_ADDRESS: {
        "balance": DEFAULT_INITIAL_BALANCE,
        "nonce": 0,
        "code": b'',
        "storage": {}
    }
}

chain = MainnetChain.from_genesis(AtomicDB(), GENESIS_PARAMS, GENESIS_STATE)

mock_address_balance = chain.get_vm().state.get_balance(MOCK_ADDRESS)

print("The balance of address {} is {} wei".format(
    encode_hex(MOCK_ADDRESS),
    mock_address_balance)
)