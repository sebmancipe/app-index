FROM node:18-alpine as base

WORKDIR /src

COPY package*.json /src

RUN npm ci && npm cache clean --force

FROM base as dev

ENV NODE_ENV=development

COPY . /src

CMD ["npm", "run", "start:dev"]