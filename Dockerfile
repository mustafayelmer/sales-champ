FROM node:15-slim

# app
WORKDIR /usr/src/app

COPY ./src ./src
COPY package.json ./
COPY tsconfig.json ./
COPY nestconfig.json ./

# install dependencies
RUN npm install


# debug
EXPOSE 8090
CMD [ "npm","run","start" ]
#CMD [ "npm","run","dev-start" ]

