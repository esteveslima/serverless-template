# serverless-template


This repository provides(or intend to) working templates with a set of examples for a serverless project, seeking for best practices and tools for a agile development environment and optimized structure for production.

TODO: reference to files in each topic

<br/><br/><br/>
---

# The Stack

## [Serverless Framework](https://www.serverless.com/) 


<a href="https://www.serverless.com/"><img src="https://getcommandeer.com/_nuxt/img/4a7600a.png" align="right" height="180px" width="auto"/></a>
       
The power of a provider agnostic framework to manage deployment and infrastructure.

Worked providers
- aws
- <s>azure</s>
- <s>gcloud</s>



## [Node](https://nodejs.org/en/) (javascript & typescript)


<a href="https://www.typescriptlang.org/"><img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" title="Typescript" align="right" height="60px" width="auto"/></a>
<a href="https://nodejs.org/en/"><img src="https://avatars.githubusercontent.com/u/9950313?s=200&v=4" title="Node.js" align="right" height="60px" width="auto"/></a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png" title="Javascript" align="right" height="60px" width="auto"/></a>
       
Project focused on the javascript environment, with specialized tooling for development and optimization



<br/><br/><br/>
---

# Structure

### Monorepo approach to ease sharing code and configuration across project's packages, speeding up development, standardizing code and improving team's collaboration.

---

## [Npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) 


<a href="https://www.npmjs.com/"><img src="https://img.icons8.com/color/452/npm.png" title="Npm workspaces" align="right" height="180px" width="auto"/></a>
       
Packager/Manager feature for multplie packages, automatically creating links and hoisting all dependencies to a single folder in root's directory.

EVERY CHANGE IN A PACKAGE.JSON FILE REQUIRES TO RUN 'npm install' IN THE MONOREPO ROOT DIRECTORY(serverless may require leaf projects to still run npm install)



## [Lerna](https://github.com/lerna/lerna) 


<a href="https://lerna.js.org/"><img src="https://lerna.js.org/images/lerna-hero.svg" title="Lerna" align="right" height="180px" width="auto"/></a>

A Tool for managing multiple packages. Althought Lerna itself is enough for setting up a monorepo and all it's commands are available for use, in this project it is intended to be used for [releases versioning](https://github.com/lerna/lerna/tree/main/commands/version#readme) and possible CI purposes.

TODO: study and test CI applications and strategies using lerna version and lerna changed



<br/><br/><br/>
---

# Development environment

## Streamlined [git with hooks](https://git-scm.com/docs/githooks) 


<a href="https://git-scm.com/"><img src="https://avatars.githubusercontent.com/u/18133?s=200&v=4" title="Git" align="right" height="180px" width="auto"/></a>
       
A strict way to version code, organizing the complex multipackage project history. Tools applied to the entire project, used for this purpose:

  - [Husky](https://github.com/typicode/husky): Interceptor for git hooks, injecting custom scripts per stage. *Scripts located at `/resources/scripts/.husky/`*
  - [Commitzen](https://github.com/commitizen/cz-cli):  Prompt a CLI for commits, making the process easier and ensuring the main format. *Activated on `prepare-commit-msg` hook script and config located at root `package.json`*
  - [Commitlint](https://github.com/conventional-changelog/commitlint): Lint commit messages, creating a standard. *Applied on `commit-msg` hook script and config located at root `package.json`*
  - [Lint-staged](https://github.com/okonet/lint-staged):   Run given commands(E.g.: linting & unit tests) filtering only for staged files, allowing to ignore the remaining untouched packages. *Activated on `pre-commit` hook script and config located at root `package.json`*



## [Docker](https://www.docker.com/) as development environment


<a href="https://www.docker.com/"><img src="https://www.zadara.com/wp-content/uploads/docker.png" title="Docker" align="right" height="180px" width="auto"/></a>

Lightweight container for local development, with AWS-CLI and additional tools for enhanced experience. *Check the `Dockerfile`*

Providers configuration are done automatically using volumes, otherwise would be necessary to make the configuration in the host machine. *Config files at `/resources/config/`*

Use docker's npm scripts from root `package.json` or from `Makefile` to set up containers and start terminal shell.



## [Docker compose](https://docs.docker.com/compose/) service containers


<a href="https://docs.docker.com/compose/"><img src="https://raw.githubusercontent.com/docker/compose/master/logo.png" title="Docker compose" align="right" height="180px" width="auto"/></a>

Set of containers providing access to services for local development. *Check the `docker-compose.yml` file*


<a href="https://www.mysql.com/"><img src="https://pngimg.com/uploads/mysql/mysql_PNG23.png" title="MySQL" align="left" height="100px" width="auto"/></a>
<a href="https://www.mongodb.com/"><img src="https://appmasters.io/static/mongo-db-logo-cf626961400efe5ec74769616f083a37.png" title="MongoDB" align="left" height="100px" width="auto"/></a>
<a href="https://redis.io/"><img src="https://avatars.githubusercontent.com/u/1529926?s=200&v=4" title="Redis" align="left" height="100px" width="auto"/></a>
<a href="https://aws.amazon.com/dynamodb/"><img src="https://cache-site.s3.amazonaws.com/wp-content/uploads/2020/08/21150611/DybamoDB-logo.png" title="Local DynamoDB" align="left" height="100px" width="auto"/></a>
<a href="https://github.com/softwaremill/elasticmq"><img src="https://cdn.worldvectorlogo.com/logos/aws-sqs.svg" title="ElasticMQ" align="left" height="100px" width="auto"/></a>









<br/><br/><br/>
---

# Development environment
### serverless plugins & vscode vscode debugger
### docker containers -> development & local services(localstack?)
### configs
---
# packages
### services
### shared
### sls
---
# miscelaneous
### vscode plugins
TODO: instructions to run es2015 code with extension coderunner: npx babel-node --presets=@babel/preset-env $fullFileName
---

