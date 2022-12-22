FROM node:18-alpine as base

WORKDIR /src

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM base as dev

ENV NODE_ENV=development

COPY ./.docker/run-dependencies.sh .

RUN chmod +x run-dependencies.sh

ENTRYPOINT ["sh", "./.docker/run-dependencies.dev.sh"]


FROM base as release

ENV NODE_ENV=production

ENTRYPOINT ["sh", "./.docker/run-dependencies.prod.sh"]
