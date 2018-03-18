# Basic Backend Developer Interview

Hi, the test was fun doing it :)

## Loopback framework
I've used loopback framework because it lets you create and define your models quickly. Declare methods for the models and expose them as end points easily. It uses express.js under the hood so i'm familiar with it's routing, middleware, request/response handling. It has a mongodb connector and the first 2 endpoints was just a few lines thanks to this connector. I needed to use mongodb client for the bestYear and bestMonth end points.

## Docker:
I've used node:carbon as base image, that is an LTS version.
You need docker-compose to be installed. Then simply enter `docker-compose up`.

## Tests:
I've used mocha, chai, and sinon.
Run npm test, it will start mocha with proper NODE_ENV env varibale and timeout value.

Note: I haven't used chai as promised on purpose, i feel like there is no need to bring in an extra dependency, when i can do the same thing with plain old try catch.

## Eslint
I've used eslint to keep the consistent throughout the codebase.
