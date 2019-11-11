# syntax=docker/dockerfile:1.0.0-experimental

FROM node:carbon-alpine AS base

EXPOSE 9152

RUN addgroup -g 1001 app \
    && adduser -u 1001 -D -G app app \
    && mkdir -p /opt/project \
    && chown -R app:app /opt/project


# production image
FROM base as prod

WORKDIR /opt/project

USER app:app

COPY --chown=app:app ./dist /opt/project

ENTRYPOINT ["node"]

CMD ["index.js"]
