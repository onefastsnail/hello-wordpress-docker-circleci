#!/bin/bash

# some vars to configure
PROJECT_DIR=/srv/www/site
APP_CONTAINER_NAME=wordpress
APP_IMAGE=onefastsnail/hello-circleci-wordpress-docker:master

# create uploads dir, and fix permissions
mkdir -m 755 -p $PROJECT_DIR/uploads
sudo chown -R www-data:www-data $PROJECT_DIR/uploads

# test .env file is there?
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo '.env not file found!'
    exit 1
fi

echo 'Pull container...'
docker pull $APP_IMAGE

# stop all active containers
echo 'Stop container...'
docker stop $APP_CONTAINER_NAME &> /dev/null

echo 'Remove container...'
docker rm -f $APP_CONTAINER_NAME &> /dev/null

echo 'Run mariadb container if not already running...'
if [ ! "$(docker ps -q -f name=mysql)" ]; then
    docker run -d -p 3306:3306 --env-file $PROJECT_DIR/.env --name mysql -v mariadb:/var/lib/mysql mariadb:10.3.4
fi

echo 'Run redis container if not already running...'
if [ ! "$(docker ps -q -f name=redis)" ]; then
    docker run -d --name redis redis:3.2.11
fi

echo 'Run container...'
docker run -d -p 80:80 --env-file $PROJECT_DIR/.env --link mysql --link redis -v $PROJECT_DIR/uploads:/var/www/html/dist/wp-content/uploads --name $APP_CONTAINER_NAME $APP_IMAGE

# delete all unused images as, this could be filtered by age etc, leaving some backups to rollback
docker image prune -f
