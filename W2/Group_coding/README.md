# [Week2][Group3] Homework

## HW1: Customized parameter for local chain

- Default Genesis parameter in [`eth.constants`](https://github.com/ethereum/py-evm/blob/master/eth/constants.py):
```python=
GENESIS_BLOCK_NUMBER = BlockNumber(0)
GENESIS_DIFFICULTY = 17179869184
GENESIS_GAS_LIMIT = 5000
GENESIS_PARENT_HASH = ZERO_HASH32
GENESIS_COINBASE = ZERO_ADDRESS
GENESIS_NONCE = b'\x00\x00\x00\x00\x00\x00\x00B'  # 0x42 encoded as big-endian-integer
GENESIS_MIX_HASH = ZERO_HASH32
GENESIS_EXTRA_DATA = b''
GENESIS_BLOOM = 0
GENESIS_GAS_USED = 0
```

- Our Customized parameter below:
> `GENESIS_BLOOM`, `GENESIS_GAS_USED` became un-configurable in py-evm during London refactor. ref: [Troubleshoot](#Troubleshoot)
```python=
GENESIS_BLOCK_NUMBER = constants.GENESIS_BLOCK_NUMBER

# If the difficulty is too high, it will take long time to search for nonce and mix_hash. In order to facilitate the development and fast the speed of minning block, adjust it to 1
GENESIS_DIFFICULTY = 1
GENESIS_GAS_LIMIT = constants.GENESIS_GAS_LIMIT
GENESIS_COINBASE = constants.ZERO_ADDRESS # ZERO_ADDRESS = Address(20 * b'\x00')
GENESIS_NONCE = b'\x00\x00\x00\x00\x00\x00\x00B'
GENESIS_MIX_HASH = constants.ZERO_HASH32

# This is the image of three founders of this blockchain in gather.io
GENESIS_EXTRA_DATA = bytes("data:image/jpeg;base64,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", 'utf-8')
# GENESIS_BLOOM = 0
# GENESIS_GAS_USED = 0
```


#### Add customized parameter In `main.py`:
```python=
from eth import constants
from eth_typing import (
    Address,
    BlockNumber,
    Hash32
)
from eth_utils import decode_hex

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

GENESIS_BLOCK_NUMBER = constants.GENESIS_BLOCK_NUMBER
# constants.GENESIS_DIFFICULTY = 17179869184 
# If the difficulty is too high, it will take long time to search for nonce and mix_hash. In order to facilitate the development and fast the speed of minning block, adjust it to 1
GENESIS_DIFFICULTY = 1
GENESIS_GAS_LIMIT = constants.GENESIS_GAS_LIMIT # 5000
GENESIS_COINBASE = constants.ZERO_ADDRESS # ZERO_ADDRESS = Address(20 * b'\x00')
GENESIS_NONCE = b'\x00\x00\x00\x00\x00\x00\x00B'  # 0x42 encoded as big-endian-integer
GENESIS_MIX_HASH = constants.ZERO_HASH32

# Like Bitcoin genesis block
GENESIS_EXTRA_DATA = bytes("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABkXFyQZJDkiIjlCLy0vQkM4NjY4Q0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBGyQkLyYvOCMjOEc4LjhHR0c+PkdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//CABEIAJsA3QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/9oACAEBAAAAAPM9OPNIAAHkQ3aI+RLXHDbsjPmfdikxSAa8cvSrr0wo7Ycslnn2iYFcL+as8K14dcABCNvKMwlM2W18xdjoscp7Zlr53iQlPvdPrc8vJyWvTdVJsxVWZu+fWJTS12yqw85quVw0QxUh0Tsi1aEMlc9diivRmqpAL98HoejBnps1O0+JOeLKAX7+V+nCBDLcet88vzZQC7ar9WGaqdlWuFHr/PX8zZgC3dPmuurtfOyR9Ty5cxZwCy9Vt02Qds7RXf4l6moAlM9PtXJtGZ3T4nUYAEp957HrSlh04vSjHD8+RgASs530NXaWrHO3lPlEYAEpp30r46M8+OZ+cjAAlN3RTy/Nopuk5mIwAO97yceucSk5DvEQAAAAD//EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/9oACAECEAAAANueWulpnHSCKoSFy1Ms7KUXDh3ol1l0w57DWbemcwgtzYs1IFl8vfVQF2zdZzANM2yD/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/2gAIAQMQAAAAzc7IhdZllsAAk1zatsDm6Z5dNg4O2WdzU0OWevM1efXQkzsXOgMu3PNoE5vRz49NgIrNo//EACoQAAICAgECBQQDAQEAAAAAAAECAAMEERITFQUUISIxECAwMyMyQTRQ/9oACAEBAAEIAGVVIIudSyQ11f5xrQbHUWdRZ1FnUWdRZ1FnUWdRZ1FnUWdRZ1FnUWdRZ1FnUWdRZ1FnUWZNge48SGA3MGxeB3a68TOFXLcZdSnXUXTMw9ZYSUbkF6jBRfi9AjY8OpMbw5T7a28MRH4FPDFduAbB3eKa+349FLPZRg9Wk3Szwx1dgvar9AzQVis9s9s9s9s9s9s9sRQG2WCKNlRr+y62Js89Q4djDTDFal1Y+3/bEDqVU+H2A7V8XIchmdMtySzpl2DiwTMGzOnlgBZSuRXcL2zPMZgAZaMlNcXTLs/sVzD8r4dZ8nt7zt7zt7zt7zt7zt7zt7yzHdQqFlcgzylloBJwnT3HQ3O5mWZ3UHqMlP8ARlKrcl7mZ3MzuZnczO5mDOsb1HcHHz3MzuZnczO5mdzM7kZ3IzuZnczO5mdzM7mZZnCwaZsxGAB7kY3iPIEHzI+fs1FG5oTQmhBXSqbONQ7OtT20FGcV21VcNgATQhIEqNQX3cqZyphNGjsNWBOVcrQW+iWld+3YmxNichOQ+1fqq7YCWjpjcrCYgDB1GQhYrXzHrrXp9MYoH/kqNYyAw644szeYrLgiu3HVEUJdXufxXiuoZDeSrYIbcaytEt6WGn8yNkYVnNYa8H3Rxg9Ozjy/gK/anzPj6IeLAw/zehsbqAo4s0FVOfT9B8kn6Mo+YFDek6CzoLGrVDAoDbl9YTRVUqIJl6AETU1OM4icR9qAk+hRl9TPj1lXWc7q4Zs4ZsOPlH1L02VHT+sWp7DpfLZQ+OGbOGbLRevutWzmdGygEaCE/wCXMSfX8OL+wSzRX140TjQZ4J+uwizKqqPF/PUTz1EvbDyG5t0sESrydLBl89RPPURc2liFHinrjMYK63AVLQ2yI+OtFpVMv+w/Fi/sEs+JV/WZI9ongv63mUB5liQUMJRTo7T0hsq9QSoBIHRGtygou+RA8xXrxL/meYo2SC4ZnKjG/WJl/wBh+LHYq+w1hcaKNxGjkHkAB4L+t5l/9DRfftCW9dTqF9LPkehrB9BjYS2oHl+IKSAq7NtTnxL/AJnmPtSSXbYOkc1jQymLEE/hp/tEuRBo+YrhyawNzwi5Erfll3oLyYttfI6NyII19bAiC5FEe5COQc1cDqkVlSX5VrdXrxG+tsZwEyayJ5iuNfWw1L/8/FWeLbnVE6oltnIalNapUHU0clVouPSHZSMastX1fLVqCI1CBwDj4NZAuh6WTaynyCqnVHkKkPKPhq6MGpfjvfVE6olrctfiX5+pG54ZiC5WMyfDLTZtO25M7ZkTteUZ2rKgxvEVAA7dfO23xfDLy67zsEVUM0A19W/Ev2eFkhGI85SPlcipvVetXMmqy/IRV7akStqMtap1q42RUo23nKJnNypdvsf8S/P2YTcFO+azqAfAyDX+2vORbQ6nKJbkcjLV8hbGOSLB/F1Br15rMp+VZA+r/iT5+tZ04MDHjqP1HbS0OxBDcj6A0KTzsCJ7QZej9NbG5nZ1ubhJ0RHO2P1b4/Ev1HyIvxHdWJrfH0OQVps6IByGL8g7ctxfqfiH5P1f8QOpznOcoLWHwz8/lbSo0DaxnOc5ygtInXaddobmM5znOUJ3/wCF/8QAORAAAQMBBAYJAwMEAwEAAAAAAQACESESMUGRAyJRYXHhEFKBkqGxwdHwMDJiQEKyIIKi4hNQcvH/2gAIAQEACT8AIv2og6x/iVaHBXyKniERmERmERmERmERmERmERmERmERmERmERmERmERmERmERmERmERmERmERmEfxnh8onTxBHmiBrTXeiM0OzDJCAgBXDgVtVbvNAVoog4wnmIa6raw51monG8bkbTrdirYGMxtsgS7inHWdYZq3mzak1oME7XFkvpSHbDNY3woNoAtJj0mexQ5zRfUCcABjXE31oqQYiMJAJ7JVgtBOsTsMV2GoomtEmzf2ZINPC7sTQmhNCaE0JoTQtUGQDhKcSBOPKpyQzTReFcnTx/+ozJjwKhYwPFGqMkXXJ0k3/btnzCeSOzzFU86192yOymxPMNiLsLst6A0jgIEx6bE1rQDa1cTmnRZBAuuN6eTNMNs+YTzQz+2/52IwneHNO8Oad4c07w5p3hzTvDmneHNXBxrhXd2K6HOHr5LVgAVqnXVuV6aO9yTQCKg2uS0bSdpPJNDdoBvi7BNHe5Jo73JNHe5Jo73JNHe5JoA7eSaDG9NHe5Jo73JNHe5Jo73JNHe5Jo73JNHe5Jo73JNHe5Jo73JNHe5Jo73JMBH/o+yY2B+R9k0d7kmiv5ckBa601/jH9UdIFL5FVDARNPugeA+UQlgNmt+cActyicI/oFd6AQCA7EE35mtGXRskofU+c1iYVULYA+6+pEloikHBCwwy4XiXbTP7fNUXDou37U6wzE+gvvuTtGSXg2QLtaSftqcBuTmAAvoW/cLWqPtoDib4RhzSTVuJadbHVBiOFyc22LH/I+zRwE2gNXhgJQEWmgNEzFZtUp2GqDQJhgG3aeF+2dycI1J7GmbgLNbzJlfa14a2pgzZM/263gqB7g53GtB+NxPFEZu6v7OsLXWwVHAmxrHsNb5xThMg2ccffy+htQ2zCkudB/GPfdirQe2latjchjisSekKVKBu6LipBhbPpXoEL5y6GOJHVWj0i0ekWieSU0tKB2ppJWietHpFo9ImOGGsgAT+5Ayha9EIOzZ9LehIlD5n0dYeSeGnYStI3NaRua0gB3OWk/yWku2uotI3NaRuae0k0AlYR5r7jEIBsECRhdM12VqjabZv3k3fT39O1dYfxQBhk14Jg7vNaP/H/ZMFfx/wBk0D+3mrgiM9vYhJ4ShAttX4+fQN9/1N96GQQOSByXWH8V1PREAAzUxj7IXXK+s+CpIN9B2+iieOHun2SU4OkHf8KvdpAvx80DXcmgn8myhmPqAk8U058k058kYl3oqgtAQzdyX8uSFTv5I1p4IiRSD5oiaeQ9URwxRFHjJOBOr5pppv5Jpz5Jpz5fUCCojU17di0dtznQDJFB1jMVO64FMghwF7uoTSt0iiaGWqkFx1rrLZ62JiIFL0BZ150gP2kO1WisXRhVMaAXuFSTLAJt/df4Gbk0ulxhuArS+/tptQbZZZaJkVtGYsxwbKdeCbJG4kVBv9U8wx0XC8OA23ayeBAmgnrb6CnQCgfrmCDs3IWhArQeZTfFvum+LfdM8W+6Zdvb7qQBgHN90z/Ie60Y7w900NANTIPqiMMN4/QfOfQYh3onCcUZ+cET87E4ta4Tqm4CmZJHBP0nfKc5wItCXG6sgj1R+ZIwPm5OCMgxHeC+c/0IcQTSymvyTX/O1CNlnyUxBaZ4z6J9Z2ts+cqYaC2iBJHWu8016a7JB3b0fOX1vnJbVcES0DHajJBiVcCCohmsZ3khMMxu91EOJbAvoFcY8unEfoPnzYtvRT1VWzQ9GPv4qQ2QbM08ojsVxJMcf04BQA6fnLphR/0//8QAJxEAAgEDAwMEAwEAAAAAAAAAAAERAiExECBRAxJBEzBSsWGBofD/2gAIAQIBAT8AWCWyrp0VOalLPS6fB6XT4FRRTdInSCCCpWKEO2kEEDhFmQR7dS8opXl7GfvSSdrXAkvOigj8lSsJSsixt8otMEwpJfH0X+P0QTftGJQtyxMEPMDwNv4/1FNXNitThwKlq7cjFPA87UyWQQyBIhmCWPfJJW6+61lFv9yUN9q7sk+0xXQm0K+dH7Ny+ikuOdv/xAAnEQACAQMDAwMFAAAAAAAAAAAAARECITEQEiAwQVEDYYEiMnGRsf/aAAgBAwEBPwCIINyTVM3ZLJZcgjgkVKCNYvPcuKWX6vpvPueo7q+NG5q2Q/ybfcSjuR0IqWBpvOjubahJjodKuLjX9wsxf96SvJuRuO0jtfwepVNM+SnC41K4k5mBiS8/0ajAnGVJMvBVMYL4gpxxaTIRSnTMuST4Gz4Mm1CtzlEopplFVmShPoM7kXFVCK730p6Ni2v0ijtx/9k=", 'utf-8') 
GENESIS_BLOOM = 0
GENESIS_GAS_USED = 0

    
chain_class = Chain.configure(
    __name__='Test Chain',
    vm_configuration=(
        (constants.GENESIS_BLOCK_NUMBER, FrontierVM),
        (HOMESTEAD_MAINNET_BLOCK, HomesteadVM),
    ),
)

chain = chain_class.from_genesis_header(AtomicDB(), MAINNET_GENESIS_HEADER)


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
    # 'block_number': GENESIS_BLOCK_NUMBER,
    'difficulty': GENESIS_DIFFICULTY,
    'gas_limit': GENESIS_GAS_LIMIT,
    'coinbase': GENESIS_COINBASE,
    'nonce': GENESIS_NONCE,
    'mix_hash': GENESIS_MIX_HASH,
    'extra_data': GENESIS_EXTRA_DATA,
    # 'bloom': GENESIS_BLOOM,
    # 'gas_used': GENESIS_GAS_USED,
}

chain = MainnetChain.from_genesis(AtomicDB(), GENESIS_PARAMS, GENESIS_STATE)
```

## HW2: Retrieving a valid nonce and mix hash

Run python shell and type code below：
```python=
from eth import constants
from eth.consensus.pow import mine_pow_nonce
from eth.chains.base import MiningChain
from eth.vm.forks.byzantium import ByzantiumVM
from eth.db.atomic import AtomicDB

GENESIS_PARAMS = {
      'difficulty': 1,
      'gas_limit': 3141592,
      'timestamp': 1514764800,
  }

klass = MiningChain.configure(
    __name__='TestChain',
    vm_configuration=(
        (constants.GENESIS_BLOCK_NUMBER, ByzantiumVM),
    ))
chain = klass.from_genesis(AtomicDB(), GENESIS_PARAMS)

block_result = chain.get_vm().finalize_block(chain.get_block())
block = block_result.block

nonce, mix_hash = mine_pow_nonce(
    block.number,
    block.header.mining_hash,
    block.header.difficulty)

block = chain.mine_block(mix_hash=mix_hash, nonce=nonce)
print (block)
```

### Screenshot
![](./snapshot001.png)

## HW3
![](./hw3.png)

## Troubleshoot
1. There has some params became un-configurable in py-evm during London refactor
![](./troubleshoot1.png)
![](./troubleshoot2.png)
![](./troubleshoot3.png)
> reference: https://github.com/ethereum/eth-tester/blob/master/eth_tester/backends/pyevm/main.py#L136