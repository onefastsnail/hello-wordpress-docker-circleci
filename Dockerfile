# to speed up the build time i have have pushed common tasks into an image to my Dockerhub registry
FROM onefastsnail/wordpress-apache:latest

ENV APACHE_DOCUMENT_ROOT /var/www/html/dist
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

RUN a2enmod rewrite

COPY ./dist /var/www/html/dist

RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html/dist
