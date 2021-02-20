# Makefile created to alias the commands used to setup development environment

COMPOSE_PATH=./docker-compose.yml
SERVERLESS_SERVICE_NAME=serverless-container

# # get arguments from make command
# RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
# $(eval $(RUN_ARGS):;@:)

# all:
# 	@echo $(RUN_ARGS)


up:
	docker-compose --file $(COMPOSE_PATH) up --detach
clean-up:
	docker-compose --file $(COMPOSE_PATH) up --detach --build --force-recreate --always-recreate-deps

down: cleanup
	docker-compose --file $(COMPOSE_PATH) down
clean-down:	cleanup
	docker-compose --file $(COMPOSE_PATH) down --rmi all --volumes --remove-orphans
cleanup:
	sudo rm -rf .serverless/ .webpack/

sh:
	docker-compose --file $(COMPOSE_PATH) exec --privileged $(SERVERLESS_SERVICE_NAME) bash
bash:
	docker-compose --file $(COMPOSE_PATH) exec --privileged $(SERVERLESS_SERVICE_NAME) bash
