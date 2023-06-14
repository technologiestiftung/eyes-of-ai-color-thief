# docker file for nodejs using debian slim
# https://hub.docker.com/_/node/
#

FROM node:18.16.0-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Bundle app source
COPY . .
# Create the images folder
RUN mkdir -p /usr/src/app/images
# Expose port
EXPOSE 3000

ENV ADDRESS=0.0.0.0 PORT=3000

# Run app
CMD [ "node", "index.js" ]