# Setting up a serverless container for development

# Use the official node image 
FROM node:lts-alpine as nodeBuilderStage

# Install extra useful packages for alpine version
RUN apk add --no-cache curl && \
    apk add --no-cache bash && \
    apk add --no-cache nano && \
    apk add --no-cache sudo

# Install development packages(beware of versions) TODO: register last working versions
RUN npm install -g npm@lts && \    
    npm install -g serverless
    # not working with alpine
    #curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install && \
    #apk add --no-cache inotify-tools

# Grant privileges to alpine native node user
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node && \
    chmod 755 /root
# Change and config(bash) node user
USER node
RUN echo "PS1='\e[1;30m[\w]\$ \e[0m'" >> ~/.bashrc; source ~/.bashrc

# Keeps de container running
CMD tail -f /dev/null