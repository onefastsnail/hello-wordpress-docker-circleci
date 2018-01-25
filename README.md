# Hello Circle CI Wordpress Docker example

An experiment with a [Wordpress](https://wordpress.org) project running in [Docker](https://www.docker.com/) integrated with [Circle CI](https://circleci.com) from development to production.

## Goals

* To share indentical environments between development and production
* All the build tools bundled with the project
* Implement JS/CSS linting to help increase code quality and reduce bugs
* Implement end to end testing to ensure functionality works as intended
* Implement PHP unit testing
* To be able to deploy from simply pushing work to the git repository.
* Use a docker registry to hold application code, so project deployment and rebuilds are easy and require no local project to be built.
* To use branches/tags for staging versions of the application
* To get CI build time as fast as possible by caching steps, building my own image with the tools required
* To utilize some logging services for PHP, Nginx
* Use either docker compose, simple bash commands, maybe Ansible to run the relevant Docker commands on production
* Fetch Wordpress, plugins and other PHP libs via Composer
* Use Gulp/Webpack for build tools to create a clean build everytime

## Development flow

## Usage

1. Copy and configure `.env.example` to `.env`
2. `docker-compose up -d` to spin up the Docker stack
3. `yarn install` to install our build deps
4. `yarn run dev` to run the build tools for development
5. And enjoy [http://localhost](http://localhost) 

## Docker

## Circle CI
