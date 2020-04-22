SHELL := /bin/bash

OPTIONS=--force-recreate --renew-anon-volumes --build
DOCKER_FILES=-f docker-compose.yml

.PHONY: all
all: docker

docker: down
	docker-compose $(DOCKER_FILES) up -d --remove-orphans $(OPTIONS)

down:
	docker-compose down --remove-orphans
