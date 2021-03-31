# serverless-template
# serverless-template

serverless variables loaded through .js variables

dynamic import of definitions(one file per function)
dynamic loading definitions(e.g. plugins), run sls print to ensure config
must use --service flag to define which project to run the command

the purpose of this template was to build a dynamic structure that should work for multiple vendors with the same business logic code, changing basic parameters(provider, region, stage, etc).
also this project should contain all the configuration for local testing, dynamically loading plugins and resources and providing examples.
remember to keep tracking of framework version to new issues(install serverless locally in package.json).

breaking changes introduced in latest versions(2.31.0) that prevent this configuration to work, remaining enhancements abandoned for that reason.
A solution would be to change current structure to monorepo, using common config(maybe lerna).
