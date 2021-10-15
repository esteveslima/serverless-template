# Common scripts

The intent of this folder is to centralize all scripts regarding the repository and environment configuration.

Currently the most important scripts are for Git hooks, captured with husky npm package.
- pre-commit: (before the commit) Runs lint-staged in every package in the repository, which filters for only modified ones. The commands for lint-staged are configured at the base package.json. In short, this hook runs code validation and tests only on modified projects in the monorepo(staged on git).
- prepare-commit: (before the commit but after pre-commit) Simple script to choose between a guided commit with commitzen or a normal commit. Normal commits must be allowed to make better usage of all git commands and still have their format validated, but the usage of commitzen is advised.
- commit-msg: (on setup commit message) Runs commitlint to check commit msg format.