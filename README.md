# Basic Backend Developer Interview

Hi, the test was fun doing it :)

## Docker:
I've used node:carbon as base image, that is an LTS version.
You need docker-compose to be installed. Then simply enter `docker-compose up`.

## Tests:
I've used mocha, chai, and sinon.
Run npm test, it will start mocha with proper NODE_ENV env varibale and timeout value.

##### Note:
I haven't used chai as promised on purpose, i feel like there is no need to bring in an extra dependency, when i can do the same thing with plain old try catch.


