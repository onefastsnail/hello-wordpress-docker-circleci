#!/bin/bash

# stop all active containers?

echo 'Pull container..'
docker pull onefastsnail/hello-circleci-wordpress-docker:master

echo 'Stop container...'
docker stop hello-circleci-wordpress-docker &> /dev/null

echo 'Remove container..'
docker rm -f hello-circleci-wordpress-docker &> /dev/null

echo 'Run container..'
docker run -d -p 80:80 --env-file /srv/www/hello-circleci-wordpress-docker/.env --name hello-circleci-wordpress-docker onefastsnail/hello-circleci-wordpress-docker:master