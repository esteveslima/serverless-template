# Setting up a serverless container for development

# FROM ubuntu:latest

# # replace shell with bash so we can source files
# RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# # update the repository sources list
# # and install dependencies
# RUN apt-get update \
#     && apt-get install -y curl \
#     && apt-get -y autoclean

# # nvm environment variables
# ENV NVM_DIR /usr/local/nvm
# ENV NODE_VERSION 4.4.7

# # install nvm
# # https://github.com/creationix/nvm#install-script
# RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# # install node and npm
# RUN source $NVM_DIR/nvm.sh \
#     && nvm install $NODE_VERSION \
#     && nvm alias default $NODE_VERSION \
#     && nvm use default

# # add node and npm to path so the commands are available
# ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
# ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# # confirm installation
# RUN node -v
# RUN npm -v

###############################################################################################################################

# Using Alpine version causes 'npm install' to fail when running inside the container...
# ...Use a more robust image or run 'npm install' outside the container

# Use the official node image 
FROM node:lts-alpine as nodeBuilderStage

# # Install required extra packages(attempt to make npm install work inside container)
# RUN apk update && \
#     apk add --no-cache --virtual .build-deps make gcc g++ python && \
#     apk add --no-cache build-base

# Install extra useful packages for alpine version
RUN apk add --no-cache curl && \
    apk add --no-cache bash && \
    apk add --no-cache nano && \
    apk add --no-cache inotify-tools && \
    npm install -g serverless@2.30.3
    #THIS IS THE LATEST WORKING VERSION WITH THIS STRUCTURE(breaking changes introduced at 2.31.0)
    #curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install # not working with alpine

# Keeps de container running
CMD tail -f /dev/null