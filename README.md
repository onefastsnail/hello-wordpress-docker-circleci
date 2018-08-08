[![CircleCI](https://circleci.com/gh/onefastsnail/hello-circleci-wordpress-docker.svg?style=svg)](https://circleci.com/gh/onefastsnail/hello-circleci-wordpress-docker)

# Hello Wordpress Docker CircleCI

[WIP] A [Wordpress](https://wordpress.org) project running in [Docker](https://www.docker.com/) integrated with [Circle CI](https://circleci.com) to deploy from development to production.

## Usage

I am using the `Wordpress` Docker container to run the commands through as that container has the required tools and libs to build and develop this project. The idea here is to allow the host machine to remain free of such tools and simply only require Docker to get this party started. These command of course could be wrapped to make more pleasing to the eye and easier to remember.

1. Copy and configure `.env.example` to `.env`
2. `docker-compose up -d` to spin up the Docker stack
3. `docker exec -it $(docker ps -qf "name=wordpress") bash -c "composer install"`
4. `docker exec -it $(docker ps -qf "name=wordpress") bash -c "yarn install"` to install our build deps
5. `docker exec -it $(docker ps -qf "name=wordpress") bash -c "yarn dev"` to run the build tools for development
6. And enjoy [http://localhost](http://localhost) 

## Development flow

1. Run `docker exec -it $(docker ps -qf "name=wordpress") bash -c "yarn dev"` to start Webpack and Gulp to watch files to bundle
1. Do your code changes and commit them
2. Upon committing this will trigger npm tests such as linting, project tests etc
3. A Git push will trigger CircleCI to build and deploy the project

To mock a build in production, ie with copying files rather mounted volumes, run `docker-compose -f docker-compose-production-test.yml up -d --build`

## Wordpress

### Theme

Under construction.

## Tests

### End to end tests

* `yarn run e2e` to run all tests (@todo: fix this in the container)

## Docker

In development i lazily use [Docker Compose](https://docs.docker.com/compose/) to orchestrate the containers, on production via a bash script which i guess could be done with Ansible or whatever (@todo need to finalise).

As mount bindings overrule the directory the mount points too, in development we can simply mount our code and in production the code is copied in. 

## Circle CI

Coming soon.

## Redis

I have added [Redis](https://hub.docker.com/_/redis/) as a service, just for an example, and it could be handy when there is heavy usage of WP Admin and other heavy WP query related operations going down.

## Goals

* ~~To share indentical environments between development and production~~
* ~~All the build tools bundled with the project~~
* ~~Use Gulp/Webpack for build tools to create a clean build everytime~~
* ~~Implement JS linting to help increase code quality and reduce bugs~~
* Implement end to end testing to ensure functionality works as intended
* ~~Attached to a Slack channel to notify other project members of the build and its movements.~~
* Implement PHP unit testing
* ~~To be able to deploy by simply pushing work to the remote git repository~~
* ~~Use a docker registry to hold application code, so project deployment and rebuilds are easy and require no local project to be built~~
* To use branches/tags for staging and production versions of the application
* ~~To get CI build time as fast as possible by caching steps, building my own image with the tools required~~
* To utilize some logging services for PHP, Nginx
* ~~Fetch Wordpress, plugins and other PHP libs via Composer~~
* ~~Testing upon every commit to ensure the quality of code being committed~

## Notes

* Putting WP in a subdirectory? Would simplify things, but WP complains ie multisite and some plugins when this happens, hence my decision to have a `src` `dist` nature to merge the application together.


## Contributors

Paul Stewart
