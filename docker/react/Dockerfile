FROM node:14-alpine as base

RUN mkdir -p /usr/src/fullstack-app/frontend
WORKDIR /usr/src/fullstack-app/frontend
COPY . .
RUN npm install
CMD [ "npm", "start" ]