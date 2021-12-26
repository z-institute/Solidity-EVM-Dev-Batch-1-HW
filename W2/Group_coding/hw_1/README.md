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
  w2_group_coding_hw_1:
    container_name: w2_group_coding_hw_1
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
docker exec -it w2_group_coding_hw_1 sh
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
from eth import constants
from eth.chains.mainnet import MainnetChain
from eth.db.atomic import AtomicDB
from eth_typing import Address
from eth_utils import to_wei, encode_hex

ETHAN_ADDRESS = Address(20 * b'\x11')
WALTER_ADDRESS = Address(20 * b'\x22')
LEMONDE_ADDRESS = Address(20 * b'\x33')

FOUNDER_INITIAL_BALANCE = to_wei(1000000, 'ether')
GENESIS_PARAMS = {
     # accelerate mining
    'difficulty': 1,
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

```

- execute
```shell
python app/main.py
```
