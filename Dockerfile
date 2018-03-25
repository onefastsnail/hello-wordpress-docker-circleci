# to speed up the build time i have have pushed common tasks into an image to my Dockerhub registry, (to be nginx soon), will also supply a development dockerfile with all tools needed to within
FROM onefastsnail/wordpress-apache:latest

ENV APACHE_DOCUMENT_ROOT /var/www/html/dist
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

RUN a2enmod rewrite

COPY ./dist /var/www/html/dist

WORKDIR /var/www/html/dist

RUN chown -R www-data:www-data /var/www/html
RUN find . -type d -exec chmod 755 {} \;
RUN find . -type f -exec chmod 644 {} \;
