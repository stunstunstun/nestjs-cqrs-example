# Mileages

Express event sourcing through the mileage system :rocket:

## Prerequisites

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ command -v nvm
$ nvm install lts/erbium
$ which node
$ npm install -g yarn
$ brew update
$ brew install mongodb
$ mkdir -p $HOME/data/db
$ nohup mongod --dbpath $HOME/data/db &>/dev/null &
```

## Installation

```bash
$ yarn install
```

## Testing

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Running the app

```bash
# development
$ yarn start

# production mode
$ yarn serve
```