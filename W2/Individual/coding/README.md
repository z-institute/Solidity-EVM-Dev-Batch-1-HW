1. 我的mac本來就有裝python3, pip3, venv
2. 建立venv並安裝py-evm
```bash
python -m venv zenv
source zenv/bin/activate.fish
pip3 install -U py-evm
```
3. ```git clone https://github.com/ethereum/ethereum-python-project-template.git demo-app```
4. 編輯 ./demo-app/setup.py
``` python
name='demo-app',
```
```python
install_requires=[
    "eth-utils>=1,<2",
    "py-evm==0.5.0a0",
],
```
5. ```pip install -e ".[dev]"```
6. ``` vim ./app/main.py``` 並貼上以下程式碼
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
7. ```python app/main.py``` 出現 error message 如下
```bash
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/chains/base.py", line 232, in from_genesis
    apply_state_dict(state, genesis_state)
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/_utils/db.py", line 31, in apply_state_dict
    state.set_balance(account, account_data["balance"])
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/vm/state.py", line 133, in set_balance
    self._account_db.set_balance(address, balance)
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/db/account.py", line 262, in set_balance
    account = self._get_account(address)
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/db/account.py", line 383, in _get_account
    rlp_account = self._get_encoded_account(address, from_journal)
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/db/account.py", line 372, in _get_encoded_account
    return lookup_trie[address]
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/db/journal.py", line 336, in __getitem__
    return self._wrapped_db[key]
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/db/cache.py", line 22, in __getitem__
    self._cached_values[key] = self._db[key]
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/db/accesslog.py", line 45, in __getitem__
    result = self.wrapped_db.__getitem__(key)
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth/db/keymap.py", line 27, in __getitem__
    mapped_key = self.keymap(key)
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth_hash/main.py", line 41, in __call__
    return self.hasher(preimage)
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth_hash/main.py", line 26, in _hasher_first_run
    assert new_hasher(b'') == b"\xc5\xd2F\x01\x86\xf7#<\x92~}\xb2\xdc\xc7\x03\xc0\xe5\x00\xb6S\xca\x82';\x7b\xfa\xd8\x04]\x85\xa4p"  # noqa: E501
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth_hash/backends/auto.py", line 24, in keccak256
    self._initialize()
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth_hash/backends/auto.py", line 17, in _initialize
    backend = auto_choose_backend()
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth_hash/utils.py", line 19, in auto_choose_backend
    return choose_available_backend()
  File "/Users/baymo/z/zenv/lib/python3.9/site-packages/eth_hash/utils.py", line 73, in choose_available_backend
    raise ImportError(
ImportError: None of these hashing backends are installed: ['pycryptodome', 'pysha3'].
Install with `pip install eth-hash[pycryptodome]`.
```
8. 解決方法: ```pip3 install eth-hash[pycryptodome]```
9. 再次執行 ```python app/main.py```
![balance](picture.png "balance")
