# Mileages

Do event sourcing practices through the mileages system :rocket:

## Prerequisites

```bash
# Install Node.js runtime environments
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ command -v nvm
$ nvm install lts/erbium
$ which node
$ npm install -g yarn
# Install MongoDB locally and run as background
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

```bash
$ curl -i --header "Content-Type: application/json" \
  --request POST \
  --data '{"type":"REVIEW","action":"ADD","userId":"3ede0ef2-92b7-4817-a5f3-0c575361f745","placeId": "2e4baf1c-5acb-4efb-a1af-eddada31b00f"}' \
  http://localhost:3000/events
```