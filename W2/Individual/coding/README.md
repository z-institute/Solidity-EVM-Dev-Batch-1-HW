
ENV: Ubuntu
#Step:

#Install Python tools
1. apt-get install update
2. apt-get install python3.9-dev
3. apt-get install python3-pip

#Install py-evm
1. pip install virtualenv
2. virtualenv -p python3 venv
3. export PATH="xxxxxx/.local/bin:$PATH"
4. . venv/bin/activate
5. pip3 install -U pip
6. pip3 install -U py-evm

#App example
1. git clone https://github.com/ethereum/ethereum-python-project-template.git demo-app
2. cd demo-app
3. modify setup.py
   a. install_requires=[
         "eth-utils>=1,<2",
         "py-evm==0.5.0a0",
	],
   b.Rename:
	setup(
	    name='starks-app',
 
4. pip install -e ".[dev]"	
5. Add and rite main.py code
6. write "DEFAULT_INITIAL_BALANCE = to_wei(2000, 'ether')"
7. python main.py


# Output 截圖
![](./picture.png)

