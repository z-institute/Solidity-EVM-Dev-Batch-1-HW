from eth.chains.mainnet import MainnetChain
from eth.db.atomic import AtomicDB
from eth_typing import Address
from eth_utils import to_wei

ETHAN_ADDRESS = Address(20 * b'\x11')
WALTER_ADDRESS = Address(20 * b'\x22')
LEMONDE_ADDRESS = Address(20 * b'\x33')

FOUNDER_INITIAL_BALANCE = to_wei(1000000, 'ether')
GENESIS_PARAMS = {
     # accelerate mining
    'difficulty': 0x02,
    'gas_limit' : 0xffff,
    'nonce' : bytes(0),
    'timestamp' : 0x00,
    # add data like bitcoin genesis block
    'extra_data': bytes('This blockchain is created on 2021/12/25 00:00 by Ethan, Walter, Lemonde.', 'utf-8'),
}

# send founders 1000000 ETH
GENESIS_STATE = {
    ETHAN_ADDRESS: {
        "balance": FOUNDER_INITIAL_BALANCE,
        "nonce": 0,
        "code": b'',
        "storage": {}
    },
    WALTER_ADDRESS: {
        "balance": FOUNDER_INITIAL_BALANCE,
        "nonce": 0,
        "code": b'',
        "storage": {}
    },
    LEMONDE_ADDRESS: {
        "balance": FOUNDER_INITIAL_BALANCE,
        "nonce": 0,
        "code": b'',
        "storage": {}
    },
}

chain = MainnetChain.from_genesis(AtomicDB(), GENESIS_PARAMS, GENESIS_STATE)