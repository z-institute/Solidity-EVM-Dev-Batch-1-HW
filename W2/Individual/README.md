# 安裝 Py-EVM 且實作app

### Mac os

1. install Python 3 with brew

```shell=
brew install python3
```

2. install pip
```shell=
pip3 install -U pip
```
3. install py-evm package via pip
```shell=
pip3 install -U py-evm
```

reference: https://py-evm.readthedocs.io/en/latest/guides/quickstart.html


---

### Building an app that uses Py-EVM


1. clone demo-app
```shell=
git clone https://github.com/ethereum/ethereum-python-project-template.git demo-app
```
2. change into the directory
```
cd demo-app
```
3. Add the Py-EVM library as a dependency
open setup.py file and edit the following section.
```python=
install_requires=[
    "eth-utils>=1,<2",
    "py-evm==0.5.0a0",
],
```
並且把檔案中的 name 改成 "demo-app".

4. to install the dependencies, run
```shell=
pip install -e ".[dev]"
```
5. create a new directory app and create a file main.py inside. Paste in the following content.
```python=
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

6. run the script
```python=
python3 app/main.py
```

### result

![](https://i.imgur.com/fVNmQEU.png)


