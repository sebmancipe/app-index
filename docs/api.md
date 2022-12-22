# Available Endpoints and Preset Values
The next list are the available endpoints for this project. Please consider the project itself has a set of preset values in the database, so please check them at the end of this document to use these APIs properly.

## Application status
Application health check returning a default response for app and validating initialized connection to the database.
```
GET /app/status
```
Example request:
```bash
$ curl http://localhost:3110/app/status
```
Example result:
```json
{
    "serviceAvailable": true,
    "dataSourceStatus": true,
}
```

## Profile creation
Creates an user profile along the location provided and returns the user, profile and location created.
```
POST /v1/profile/create

Body:
{
    "username": string,
    "password": string,
    "name": string,
    "address": string,
    "cityId": number
}
```
Example request:
```bash
$ curl -X POST http://localhost:3110/v1/profile/create -H 'Content-Type: application/json'  -d "{\"username\":\"username.surname\",\"password\":\"my-password\",\"name\":\"Jhon Lark\",\"address\":\"Bakery St\",\"cityId\":2}"
```
Example result:
```json
{
    "id": 1,
    "name": "Jhon Lark",
    "addresss": {
        "street": "Bakery St",
        "city": "Cali",
        "country": "Colombia",
    }
}
```

## User login
Returns a access token (JWT) if the username and password matches a user in the database
```
POST /v1/profile/log-in

Body:
{
    "username": string,
    "password": string
}
```
Example request:
```bash
$ curl -X POST http://localhost:3110/v1/profile/log-in -H 'Content-Type: application/json'  -d "{\"username\":\"username.surname\",\"password\":\"my-password\"}"
```
Example result:
```json
{
    "accessToken": "accessToken"
}
```

## Get user profile and location
Returns an user profile and location based on an access token given in the `Authorization: Bearer` header. The token has a expiration time of 1 hour by default.
```
GET /v1/profile
Headers {
    "Authorization": "Bearer accessTokenHere" 
}
```
Example request:
```bash
$ curl http://localhost:3110/v1/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBpcG8iLCJzdWIiOjksImlhdCI6MTY3MTY4NzA2NiwiZXhwIjoxNjcxNjkwNjY2fQ.fLUk5fUO48gQcDU1WdPt-W_JXTb2yeBnZ-k9NMFD3gY"
```
Example result:
```json
{
    "id": 1,
    "name": "Jhon Lark",
    "addresss": {
        "street": "Bakery St",
        "city": "Cali",
        "country": "Colombia",
    }
}
```

# Preset Values
The tables `city` and `country` have the next preset values:

`country`:
| id      | name |
| ----------- | ----------- | 
| 1      | Colombia       |
| 2   | Brazil     |
| 3   | Argentina        |
| 4   | Switzerland        |
| 5   | France        |


`city`:
| id      | name | countryId |
| ----------- | ----------- | ----------- |
| 1      | Cali       | 1
| 2  | Barranquilla        | 1
| 3  | Recife        | 2
| 4  | Brasilia        | 2
| 5  | Buenos Aires        | 3
| 6  | Berne        | 4
| 7  | Marsella        | 5