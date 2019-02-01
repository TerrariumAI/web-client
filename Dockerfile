# Dockerfile for gRPC Go
FROM node:11.9

EXPOSE 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app