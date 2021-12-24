# W2 用 Python 跑一個 EVM (py-evm) 

## 安裝環境

先安裝 python：
```sh
brew install python3
```
:::info
以上為 macOS 安裝方式。
:::
再安裝虛擬環境：
```sh
pip install virtualenv
```
建立名為 pyevm_test 的虛擬環境並切換至該環境：
```sh
virtualenv -p python3 pyevm_test
. pyevm_test/bin/activate
```
安裝 pyevm：
```sh
pip3 install -U py-evm
```

## 複製專案
接著使用 git clone 範例 Repo 並切換至該目錄：
```sh
git clone https://github.com/ethereum/ethereum-python-project-template.git demo-app
cd demo-app
```
開啟 setup.py 將其中程式碼：
```py
    install_requires=[
        "eth-utils>=2,<3",
    ],
```
改為：
```py
    install_requires=[
        "eth-utils>=1,<2",
        "py-evm==0.5.0a0",
    ],
```
再將 <PYPI_NAME> 改成自己的名字 (如 demo-appX) 後將這份 setup.py 存檔：
```py
setup(
    name='<PYPI_NAME>',
    ...
```
最後將自己的範例 app 安裝起來：
```sh
pip install -e ".[dev]"
```

## 範例程式
直接開啟 python 互動環境後, 輸入範例程式碼：
```py
>>> from eth import constants
>>> from eth.chains.mainnet import MainnetChain
>>> from eth.db.atomic import AtomicDB
>>> from eth_utils import to_wei, encode_hex
>>> MOCK_ADDRESS = constants.ZERO_ADDRESS
>>> DEFAULT_INITIAL_BALANCE = to_wei(10000, 'ether')
>>> GENESIS_PARAMS = {
...     'difficulty': constants.GENESIS_DIFFICULTY,
... }
>>> GENESIS_STATE = {
...     MOCK_ADDRESS: {
...         "balance": DEFAULT_INITIAL_BALANCE,
...         "nonce": 0,
...         "code": b'',
...         "storage": {}
...     }
... }
>>> chain = MainnetChain.from_genesis(AtomicDB(), GENESIS_PARAMS, GENESIS_STATE)
>>> mock_address_balance = chain.get_vm().state.get_balance(MOCK_ADDRESS)
>>> print("The balance of address {} is {} wei".format(
...     encode_hex(MOCK_ADDRESS),
...     mock_address_balance)
... )
```
也可以建立一個 python 檔案 main.py, 再將範例程式碼貼上後存檔, 再執行：
```
python3 main.py
```

兩種方法皆會得到最終 print 的輸出結果：
```sh
The balance of address 0x0000000000000000000000000000000000000000 is 10000000000000000000000 wei
```
