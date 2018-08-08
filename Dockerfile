FROM onefastsnail/phpfpm-nginx-supervisor-debian

# Configure nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/conf /etc/nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Configure supervisord
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./dist /var/www/html/dist

WORKDIR /var/www/html/dist

RUN chown -R www-data:www-data /var/www/html/dist
RUN find . -type d -exec chmod 755 {} \;
RUN find . -type f -exec chmod 644 {} \;

EXPOSE 80 443
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
