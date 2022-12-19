# app-index
Lucky code challenge

## Installation

```bash
$ npm install
```

## Running the app

In order to execute the application you must have installed docker compose.

```bash
# Set up the application in dev mode and its dependencies in detached mode
$ docker compose -f .docker/compose.yaml up -d
```

Two docker images will be created: a mysql database and a containerized application.

<sub>Note: The application has enabled live reolading. Any change done in the application source code will trigger a new building and starting of the container<sub>

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
