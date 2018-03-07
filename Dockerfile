# to speed up the build im have pushed the commented code below to a prebuilt image on my registry
FROM onefastsnail/wordpress-apache:latest

# FROM php:7.2-apache

# ENV APACHE_DOCUMENT_ROOT /var/www/html/dist

# RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# RUN docker-php-ext-install mysqli

RUN a2enmod rewrite

COPY ./dist /var/www/html/dist

RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html/dist
