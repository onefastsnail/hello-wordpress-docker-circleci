FROM php:7.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/dist

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

RUN docker-php-ext-install mysqli

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html/dist