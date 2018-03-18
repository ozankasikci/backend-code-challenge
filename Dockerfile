FROM node:carbon-alpine

# Install needed packages. Notes:
#   * dumb-init: a proper init system for containers, to reap zombie children
#   * build-base: used so we include the basic development packages (gcc)
#   * bash: so we can access /bin/bash
ENV PACKAGES="\
  dumb-init \
  build-base \
  bash \
"

WORKDIR /opt/backend-challenge
COPY ./package*.json ./

RUN npm i

COPY . .

EXPOSE 9005

CMD ["npm", "start"]

