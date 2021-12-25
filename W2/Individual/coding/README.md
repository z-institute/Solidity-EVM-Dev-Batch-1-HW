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
FROM python:${PYTHON_VERSION}-alpine as local
RUN apk update && apk add gcc libc-dev make git libffi-dev openssl-dev python3-dev libxml2-dev libxslt-dev
EOF
```
- create docker-compose.yaml
```shell
cat << EOF > docker-compose.yaml
version: "3.8"
services:
  w2_individual_hw_2:
    container_name: w2_individual_hw_2
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
docker exec -it w2_individual_hw_2 sh
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
```

- execute
```shell
python app/main.py
```


# Output 截圖
![](./screenshots/w2_individual_hw_2.png)