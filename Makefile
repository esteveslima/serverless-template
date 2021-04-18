# Command aliases to setup development environment

COMPOSE_PATH=./docker-compose.yml
SERVERLESS_SERVICE_NAME=serverless-container

up:
	docker-compose --file $(COMPOSE_PATH) up --detach
clean-up:
	docker-compose --file $(COMPOSE_PATH) up --detach --build --force-recreate --always-recreate-deps

down:
	docker-compose --file $(COMPOSE_PATH) down && make wipe
clean-down:
	docker-compose --file $(COMPOSE_PATH) down --rmi all --volumes --remove-orphans && make wipe
wipe:
	sudo rm -rf .serverless/ .webpack/ .mongodb-storage/ .mysql-storage/ .redis-storage/ .s3-local/ .dynamodb-storage/

rebuild:
	make down && make up

sh:
	docker-compose --file $(COMPOSE_PATH) exec --privileged $(SERVERLESS_SERVICE_NAME) bash
bash:
	docker-compose --file $(COMPOSE_PATH) exec --privileged $(SERVERLESS_SERVICE_NAME) bash
