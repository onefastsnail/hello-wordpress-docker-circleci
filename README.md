[![CircleCI](https://circleci.com/gh/onefastsnail/hello-circleci-wordpress-docker.svg?style=svg)](https://circleci.com/gh/onefastsnail/hello-circleci-wordpress-docker)

# Hello Circle CI Wordpress Docker

A [Wordpress](https://wordpress.org) project running in [Docker](https://www.docker.com/) integrated with [Circle CI](https://circleci.com) to deploy development to production.

## Development flow

1. Do your code changes
2. git add
3. git commit, upon this it will run a npm tests such as linting, project tests etc
4. git push to build and deploy the project

## Usage

1. Copy and configure `.env.example` to `.env`
2. `docker-compose up -d` to spin up the Docker stack
3. `yarn install` to install our build deps
4. `yarn dev` to run the build tools for development
5. And enjoy [http://localhost](http://localhost) 

## Wordpress

### Theme

Under construction.

## Tests

### End to end tests

* `yarn run e2e` to run all tests

## Docker

On development i currently use Docker Compose to orchestrate the containers, on production currently just a simple container, could be done with Ansible or a simple bash script also i guess.

As mount bindings overrule the directory the mount points too, in development we can simply mount our code, and in production the code is copied in. 

## Circle CI

Attached to a Slack channel to notify other project members of the build and its movements.

## Goals

* ~~To share indentical environments between development and production~~
* ~~All the build tools bundled with the project~~
* Implement JS/CSS linting to help increase code quality and reduce bugs
* Implement end to end testing to ensure functionality works as intended
* Implement PHP unit testing
* ~~To be able to deploy from simply pushing work to the git repository~~
* ~~Use a docker registry to hold application code, so project deployment and rebuilds are easy and require no local project to be built~~
* To use branches/tags for staging and production versions of the application
* To get CI build time as fast as possible by caching steps, building my own image with the tools required
* To utilize some logging services for PHP, Nginx
* Use either docker compose, simple bash commands, maybe Ansible to run the relevant Docker commands on production
* ~~Fetch Wordpress, plugins and other PHP libs via Composer~~
* Use Gulp/Webpack for build tools to create a clean build everytime
* ~~Implement some sort of linting, testing upon every commit to ensure the quality of code being pushed up~~

## Notes

* Putting WP in a subdirectory? Would simplify things, but WP complains ie multisite and some plugins when this happens, hence my decision to have a src dist nature to blend the files together.
