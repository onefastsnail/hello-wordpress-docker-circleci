[![CircleCI](https://circleci.com/gh/onefastsnail/hello-wordpress-docker-circleci.svg?style=svg)](https://circleci.com/gh/onefastsnail/hello-wordpress-docker-circleci)

# Hello Wordpress Docker CircleCI

A [Wordpress](https://wordpress.org) project running in [Docker](https://www.docker.com/) integrated with [Circle CI](https://circleci.com), ready to deploy from development to production, bundled with all the necessary tools.

## Usage

I am using the `Wordpress` Docker container to run the commands through as that container has the required tools and libs to build and develop this project. The idea here is to allow the host machine to remain free of such tools, only require Docker to get this party started. This way all libraries and their versions are consistent across the project and its team.

1. Copy and configure `.env.example` to `.env`
1. `$ docker-compose up -d` to spin up the Docker stack
1. `$ docker exec -it $(docker ps -qf "name=wordpress") bash -c "composer install"`
1. `$ docker exec -it $(docker ps -qf "name=wordpress") bash -c "yarn install"` 
1. `$ docker exec -it $(docker ps -qf "name=wordpress") bash -c "yarn dev"`
1. And enjoy [http://localhost](http://localhost) 

## A Typical Development flow

1. Running `docker exec -it $(docker ps -qf "name=wordpress") bash -c "yarn dev"` will start Webpack and Gulp which will bundle and watch the necessary assets ie CSS and JS.
1. Do your code changes and commit them
1. A Git push to the remote origin will trigger CircleCI to build and deploy the project to production.

### Notes
* No staging environment setup up as of yet
* You can run `$ docker exec -it $(docker ps -qf "name=wordpress") bash` to get into the contain, from which you can develop within ie run all your commands.
* To mock a production style build, ie with copying files rather mounted volumes, run `$ docker-compose -f docker-compose-production-test.yml up -d --build`

## Wordpress

### Theme

Under construction.

## Tests

### End to end tests

* `$ yarn run e2e` to run all tests (@todo: fix this in the container)

## Docker

In development i lazily use [Docker Compose](https://docs.docker.com/compose/) to orchestrate the containers, on production via a bash script which i guess could be done with Ansible or whatever (@todo need to finalise).

As mount bindings overrule the directory the mount points too, in development we can simply mount our code and in production the code is copied into the container for easier distribution. 

## Circle CI

Setup requires the following environment variables setup:

1. `DOCKER_REPO` your Docker repository URL
1. `DOCKER_USER` your Docker username
1. `DOCKER_PASS` your Docker password
1. `PRODUCTION_IP` your production server IP
1. `PRODUCTION_USER` your production server user
1. `WP_THEME_NAME`

## Redis

I have added [Redis](https://hub.docker.com/_/redis/) as a service, just for an example, and it could be handy when there is heavy usage of WP Admin and other heavy WP query related operations going down.

## Goals

* ~~To share indentical environments between development, staging and production~~
* ~~All the build tools, including versions bundled with the project~~
* ~~Use Gulp/Webpack for build tools to produce clean builds~~
* ~~Implement JS linting to help increase code quality and reduce bugs~~
* Implement end to end testing to ensure functionality works as intended
* ~~Attached to a Slack channel to notify other project members of the build and its movements.~~
* Implement PHP unit testing
* ~~To be able to deploy by simply committing work to the remote git repository~~
* ~~Use a docker registry to hold the application, so project deployment and rebuilds are easy and require no local project to be built~~
* To use branches/tags for staging and production versions of the application
* ~~To get CI build time as fast as possible by caching steps, building my own image with the tools required~~
* To utilize some logging services for PHP, Nginx ie Papertrail etc
* ~~Fetch Wordpress, plugins and other PHP libs via Composer~~
* ~~CSS and JS formated with Prettier~~

## Notes

* Putting WP in a subdirectory? Would simplify things, but WP complains ie multisite and some plugins when this happens, hence my decision to have a `src` `dist` nature to merge the application together.


## Contributors

Paul Stewart
