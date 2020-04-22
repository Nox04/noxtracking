SHELL := /bin/bash

OPTIONS=--force-recreate --renew-anon-volumes
DOCKER_FILES=-f docker-compose.yml

.PHONY: all
all: docker run

docker: down
	docker-compose $(DOCKER_FILES) up -d --remove-orphans $(OPTIONS)
	yarn start:dev

down:
	docker-compose down --remove-orphans
