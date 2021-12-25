# 程式碼步驟簡易說明
To isolate the local environment, using docker workflow.

- clone source code
```shell
git clone https://github.com/ethereum/ethereum-python-project-template.git demo-app
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
  demo-app:
    container_name: demo-app
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
docker exec -it demo-app sh
```

- install the dependencies
```shell
pip install -e ".[dev]"
```

- execute
```shell
python app/main.py
```


# Output 截圖
![](./screenshots/w2_individual_hw_2.png)