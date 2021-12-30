# Solidity-EVM-Dev-Batch-1-HW

Read more in the [documentation on ReadTheDocs](https://py-evm.readthedocs.io/en/latest/guides/quickstart.html)

## Quickstart

```sh
brew install python3
pip3 install -U py-evm
pip3 install eth
python3 app/main.py
```

## Developer Setup

If you would like to hack on <REPO_NAME>, please check out the [Snake Charmers
Tactical Manual](https://github.com/ethereum/snake-charmers-tactical-manual)
for information on how we do:

- Testing
- Pull Requests
- Code Style
- Documentation

### Development Environment Setup

You can set up your dev environment with:

```sh
git clone git@github.com:ethereum/<REPO_NAME>.git
cd <REPO_NAME>
virtualenv -p python3 venv
. venv/bin/activate
pip install -e .[dev]
```

### Testing Setup

During development, you might like to have tests run on every file save.

Show flake8 errors on file change:

```sh
# Test flake8
when-changed -v -s -r -1 <MODULE_NAME>/ tests/ -c "clear; flake8 <MODULE_NAME> tests && echo 'flake8 success' || echo 'error'"
```

Run multi-process tests in one command, but without color:

```sh
# in the project root:
pytest --numprocesses=4 --looponfail --maxfail=1
# the same thing, succinctly:
pytest -n 4 -f --maxfail=1
```

Run in one thread, with color and desktop notifications:

```sh
cd venv
ptw --onfail "notify-send -t 5000 'Test failure ⚠⚠⚠⚠⚠' 'python 3 test on <REPO_NAME> failed'" ../tests ../<MODULE_NAME>
```

### Release setup

For Debian-like systems:

```
apt install pandoc
```

To release a new version:

```sh
make release bump=$$VERSION_PART_TO_BUMP$$
```

### Screenshot 


![alt text](https://user-images.githubusercontent.com/56249189/147386398-89f35ffc-68d9-4174-85fc-2f794dc1a4aa.png)



