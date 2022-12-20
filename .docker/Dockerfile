FROM node:18-alpine as base

WORKDIR /src

COPY . /src/

RUN npm ci && npm cache clean --force

FROM base as dev

ENV NODE_ENV=development

RUN chmod +x ./.docker/entrypoint.sh

ENTRYPOINT ["sh", "./.docker/entrypoint.sh"]
