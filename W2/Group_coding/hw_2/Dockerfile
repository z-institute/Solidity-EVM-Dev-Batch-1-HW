ARG PYTHON_VERSION
FROM python:${PYTHON_VERSION}-alpine as local
RUN apk update && apk add gcc libc-dev make git libffi-dev openssl-dev python3-dev libxml2-dev libxslt-dev
