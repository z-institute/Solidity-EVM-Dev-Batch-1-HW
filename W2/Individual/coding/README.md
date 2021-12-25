# environment
Ubuntu20.04
# 虛擬機相關安裝
### 1. 安裝 python3相關套件及更新
```
sudo -i 切換到root使用者
apt-get install update
apt-get install python3.9-dev
apt-get install python3-pip
```

### 2.建立虛擬環境、進入虛擬機
```
pip3 install virtualenv
python3 -m virtualenv venv(virtualenv -p python3 venv 會出現command not found: virtualenv的錯誤 應該只是版本寫法問題)
. venv/bin/activate
```
註 windows要改成以下指令
#### virtualenv -p python3 venv
#### .\venv\Scripts\activate.ps1
但因為py-evm中的第三方套件pyethash不相容於windows，所以不建議用windows操作，該套件2015/11後再無更新因此錯誤無法解決

### 3.更新PIP及安裝py-evm
```
pip3 install -U pip
pip3 install -U py-evm
```

# local 跑起自己的區塊鏈
### 1. 下載範例檔案
```
git clone https://github.com/ethereum/ethereum-python-project-template.git demo-app
cd demo-app
```

### 2. 修改setup.py 及安裝dependencies
```
install_requires=[
    "eth-utils>=1,<2",
    "py-evm==0.5.0a0",
],
'<PYPI_NAME>' 改成 'demo-app'
****
pip install -e ".[dev]"
```

### 3.原路徑新增 app/main.py
```
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

### 4. 執行python檔案 
```
python3 app/main.py
```

# Result
![](./picture.png)
