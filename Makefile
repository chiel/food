SHELL=bash

.PHONY: *

DOCKER_REPO=docker.pkg.github.com/chiel/food
DOCKER_IMG="${DOCKER_REPO}/app:dev-latest"

docker-lint:
	docker run --rm -i hadolint/hadolint:latest < packages/app/Dockerfile

export DOCKER_BUILDKIT=1
docker-build:
	docker build -t "${DOCKER_IMG}" --target=dev packages/app

docker-run:
	docker run -d --rm -p 9152:9152 "${DOCKER_IMG}"

docker-check:
ifeq ($(shell docker images --filter=reference="${DOCKER_IMG}" --format={{.ID}}),)
	$(MAKE) docker-build
endif

up: docker-check
	docker-compose up -d

down:
	docker-compose down

restart: down docker-build up
