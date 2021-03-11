# Setting up a serverless container for development

# Use the official image as a parent image(Beware of the choice).
FROM node:12-alpine as nodeBuilderStage

# Install extra useful packages for alpine version
RUN apk add --no-cache curl && \
    apk add --no-cache bash && \
    apk add --no-cache nano && \
    apk add --no-cache inotify-tools && \
    npm install -g serverless 
    #curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install

# Keeps de container running
CMD tail -f /dev/null