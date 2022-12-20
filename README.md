# app-index
Lucky code challenge

## Installation

Altough is a containerized application, you can install dependencies directly.

```bash
$ npm install
```

## Running the app

In order to execute the application you must:

1. Create a `.env` file in the root of the project folder with the next content:
```
##########
# app-index application setup
##########
NODE_ENV=
PORT=


##########
# mysql database configuration
##########
DATABASE_HOST=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_PORT=
```
The example environment file (`.env.dist`) contains the development environment variables, so you can copy and paste them in the `.env` you just created.

2. Having `docker compose` installed, launch the application and database containers:

```bash
# Set up the application in dev mode and its dependencies in detached mode
$ docker compose -f .docker/compose.yaml up -d
```

Two docker images will be created: a mysql database and a containerized application. We encourage that any command that is intended to be executed in the application **should** be executed inside the container `app`. The database container can be accessed (see below) as well using the container `db`.

Notes: 
* The application has enabled live reloading. Any change done in the application source code will trigger a new building and starting of the container
* Migrations and seeding are run once the `app` container is launched.

## Manipulating the database

This project uses `typeorm` for database manipulation. Any command related to it must be executed inside the container as follows:

```bash
# Execute migrations
$ docker exec -it app npx typeorm migration:run -d dist/src/database/data-source.js

# Revert last migration
$ docker exec -it app npx typeorm migration:revert -d dist/src/database/data-source.js
```

Any command is executed in the context of the data source configuration in `dist/src/database/data-source.js`. 

You can access the containerized database as well by doing: `docker exec -it db /bin/sh`. This will prompts to you a sh command line utility where you can access the MySQL CLI by doing `mysql -u root -p`.

The credentials and username for the database can be found and changed (according of how is created the database container) inside `/.env.dist`.

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
