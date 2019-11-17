# syntax=docker/dockerfile:1.0.0-experimental

FROM node:carbon-alpine AS base

EXPOSE 9153

RUN addgroup -g 1001 api \
    && adduser -u 1001 -D -G api api \
    && mkdir -p /opt/project \
    && chown -R api:api /opt/project


# production image
FROM base as prod

WORKDIR /opt/project

USER api:api

COPY --chown=api:api ./dist /opt/project

ENTRYPOINT ["node"]

CMD ["index.js"]


# development image
FROM base AS dev

WORKDIR /opt/project/packages/api

USER api:api

VOLUME ["/opt/project"]

CMD ["yarn", "watch"]
