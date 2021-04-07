#!/bin/sh

# Check whether the current environment is the docker container

RED="\033[0;31m"
CYAN="\033[0;36m"
NO_COLOR="\033[0m"

printf "\n";

CONTAINER_DIR="/serverless-template"

if (grep 'docker\|lxc' /proc/1/cgroup -qa) && [ "${PWD##$CONTAINER_DIR}" != "${PWD}" ]
then 
    printf "${CYAN}Serverless script plugin: Detected docker environment${NO_COLOR}"; 
    STATUS=0;
else 
    printf "${RED}Serverless script plugin: USE DOCKER ENVIRONMENT${NO_COLOR}";
    STATUS=1;
fi

printf "\n";
printf "\n";

exit $STATUS;