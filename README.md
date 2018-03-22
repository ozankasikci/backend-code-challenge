# Basic Backend Developer Interview
To run the api and mongodb, simply `docker-compose up`

To run the tests, `npm test`

To run the command that fetches last 3 days neo records, `./commands/fetch-neo-records-last-3-days`

## Loopback framework
I've used loopback framework because it lets you create and define your models quickly. Declare methods for the models and expose them as end points easily. It supports promises and that is great. It uses express.js under the hood so i'm familiar with it's routing, middleware, request/response handling. It has a mongodb connector and the first 2 endpoints was just a few lines thanks to this connector. I needed to use mongodb client for the bestYear and bestMonth end points.

## Docker
I've used node:carbon as base image, that is an LTS version. Used a mongodb container, linked it to the node.js api in the docker-compose file.

## Tests
I've used mocha, chai, sinon and supertest. Note that tests need a local mongodb server.
Run npm test, it will start mocha with proper NODE_ENV env variable and timeout value.

Note: I haven't used chai as promised on purpose, i feel like there is no need to bring in an extra dependency, when i can do the same thing with plain old try catch.

## Eslint
I've used eslint to keep the code consistent throughout the codebase.
