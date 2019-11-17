SHELL=bash

.PHONY: *

DOCKER_REPO=docker.pkg.github.com/chiel/food

docker-lint:
	docker run --rm -i hadolint/hadolint:latest < packages/app/Dockerfile

export DOCKER_BUILDKIT=1
docker-build:
	docker build -t "${DOCKER_REPO}/api:dev-latest" --target=dev packages/api
	docker build -t "${DOCKER_REPO}/app:dev-latest" --target=dev packages/app

docker-run:
	docker run -d --rm -p 9153:9153 "${DOCKER_REPO}/api:dev-latest"
	docker run -d --rm -p 9152:9152 "${DOCKER_REPO}/app:dev-latest"

up:
	docker-compose up -d

down:
	docker-compose down

restart: down docker-build up
