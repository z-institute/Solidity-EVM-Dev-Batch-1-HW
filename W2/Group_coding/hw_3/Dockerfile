ARG NODEJS_VERSION
FROM node:${NODEJS_VERSION}-alpine as local
RUN apk --no-cache add curl
RUN curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sh