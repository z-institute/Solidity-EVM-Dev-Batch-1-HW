def main(request):
  try:
    from eth import constants
    from eth.chains.mainnet import MainnetChain
    from eth.db.atomic import AtomicDB

    from eth_utils import to_wei, encode_hex


    MOCK_ADDRESS = constants.ZERO_ADDRESS
    DEFAULT_INITIAL_BALANCE = to_wei(1000000, 'ether')

    GENESIS_PARAMS = {
        'difficulty': 1,
        "timestamp": 1638366284,
        "gas_limit": 3141592,
    }

    GENESIS_STATE = {
        MOCK_ADDRESS: {
            "balance": DEFAULT_INITIAL_BALANCE,
            "nonce": 4,
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
    print(GENESIS_PARAMS["timestamp"]
    )

    msg1 = "The balance of address {} is {} wei".format(
        encode_hex(MOCK_ADDRESS),
        mock_address_balance)

    msg2 = GENESIS_PARAMS["timestamp"]

    return f"{msg1}  \n {msg2}"
      
  except Exception as e:
    return str(e)
    print(e)
