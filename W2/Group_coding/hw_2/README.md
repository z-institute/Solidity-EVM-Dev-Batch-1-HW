# 程式碼步驟簡易說明
To isolate the local environment, using docker workflow.

- clone source code
```shell
git clone --depth=1  https://github.com/ethereum/ethereum-python-project-template.git demo-app && rm -rf demo-app/.git
```

- create python Dockerfile
```shell
cat << EOF > Dockerfile
ARG PYTHON_VERSION
FROM python:\${PYTHON_VERSION}-alpine as local
RUN apk update && apk add gcc libc-dev make git libffi-dev openssl-dev python3-dev libxml2-dev libxslt-dev
EOF
```
- create docker-compose.yaml
```shell
cat << EOF > docker-compose.yaml
version: "3.8"
services:
  w2_group_coding_hw_2:
    container_name: w2_group_coding_hw_2
    tty: true
    stdin_open: true
    working_dir: /app
    entrypoint: /bin/sh
    build:
      context: .
      args:
        - PYTHON_VERSION=3.9.9
    volumes:
      - ./demo-app:/app
EOF
```
- modify setup.py
    - replace `setup.py` <PYPI_NAME>  to demo-app
    - edit install_requires
```
install_requires=[
    "eth-utils>=1,<2",
    "py-evm==0.5.0a0",
],
```
- run docker
```shell
docker-compose up -d
```

-  start python container sh session
```shell
docker exec -it w2_group_coding_hw_2 sh
```

- install the dependencies
```shell
pip install -e ".[dev]"
```

- prepare sample code
```shell
mkdir app && touch main.py
```

- vim main.py
```python
from eth_keys import keys
from eth_utils import decode_hex
from eth_typing import Address
from eth import constants
from eth.chains.base import MiningChain
from eth.consensus.pow import mine_pow_nonce
from eth.vm.forks.byzantium import ByzantiumVM
from eth.db.atomic import AtomicDB


GENESIS_PARAMS = {
    'difficulty': 1,
    'gas_limit': 3141592,
    # We set the timestamp, just to make this documented example reproducible.
    # In common usage, we remove the field to let py-evm choose a reasonable default.
    'timestamp': 1514764800,
}

SENDER_PRIVATE_KEY = keys.PrivateKey(
    decode_hex('0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8')
)

SENDER = Address(SENDER_PRIVATE_KEY.public_key.to_canonical_address())

RECEIVER = Address(b'\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x02')

klass = MiningChain.configure(
    __name__='TestChain',
    vm_configuration=(
        (constants.GENESIS_BLOCK_NUMBER, ByzantiumVM),
    ))

chain = klass.from_genesis(AtomicDB(), GENESIS_PARAMS)
genesis = chain.get_canonical_block_header_by_number(0)
vm = chain.get_vm()

nonce = vm.state.get_nonce(SENDER)

tx = vm.create_unsigned_transaction(
    nonce=nonce,
    gas_price=0,
    gas=100000,
    to=RECEIVER,
    value=0,
    data=b'',
)

signed_tx = tx.as_signed_transaction(SENDER_PRIVATE_KEY)

chain.apply_transaction(signed_tx)
# (<ByzantiumBlock(#Block #1...)

# Normally, we can let the timestamp be chosen automatically, but
# for the sake of reproducing exactly the same block every time,
# we will set it manually here:
chain.set_header_timestamp(genesis.timestamp + 1)

# We have to finalize the block first in order to be able read the
# attributes that are important for the PoW algorithm
block_result = chain.get_vm().finalize_block(chain.get_block())
block = block_result.block

# based on mining_hash, block number and difficulty we can perform
# the actual Proof of Work (PoW) mechanism to mine the correct
# nonce and mix_hash for this block
nonce, mix_hash = mine_pow_nonce(
    block.number,
    block.header.mining_hash,
    block.header.difficulty
)

block=chain.mine_block(mix_hash=mix_hash, nonce=nonce)
print(block)
# <ByzantiumBlock(#Block #1-0xe372..385c)>
```

- execute
```shell
python app/main.py
```


# Output 截圖
![](./screenshots/w2_group_coding_hw_2.png)