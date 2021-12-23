# Solidity-EVM-Dev-Batch-1-HW

步驟
pip3 install -U py-evm
git clone https://github.com/ethereum/ethereum-python-project-template.git demo-app
cd demo-app/
修改 setup.py
  - <PYPI_NAME> 改成 walter_evm
  - description="""walter_evm: first evm blockchain""",
pip3 install -e ".[dev]"
  - Successfully installed walter-evm-0.1.0a0
pip3 install eth
python3 app/main.py
  - The balance of address 0x0000000000000000000000000000000000000000 is 10000000000000000000000 wei
