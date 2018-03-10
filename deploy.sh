#!/bin/bash

PROJECT_DIR=/srv/www/hello-circleci-wordpress-docker

# test .env file is there?
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo '.env not file found!'
    exit 1
fi

mkdir -m 755 -p $PROJECT_DIR/uploads
sudo chown -R www-data:www-data $PROJECT_DIR/uploads

echo 'Pull container...'
docker pull onefastsnail/hello-circleci-wordpress-docker:master

# stop all active containers?
echo 'Stop container...'
docker stop hello-circleci-wordpress-docker &> /dev/null

echo 'Remove container...'
docker rm -f hello-circleci-wordpress-docker &> /dev/null

echo 'Run mariadb container if not already running...'
if [ ! "$(docker ps -q -f name=mysql)" ]; then
    docker run -d -p 3306:3306 --env-file $PROJECT_DIR/.env --name mysql -v $PROJECT_DIR/mariadb:/var/lib/mysql mariadb:10.3.4
fi

echo 'Run container...'
docker run -d -p 80:80 --env-file $PROJECT_DIR/.env --link mysql -v $PROJECT_DIR/uploads:/var/www/html/dist/wp-content/uploads --name hello-circleci-wordpress-docker onefastsnail/hello-circleci-wordpress-docker:master
