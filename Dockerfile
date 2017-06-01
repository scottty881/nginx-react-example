FROM nginx

COPY nginx/conf.d/nginx.template.conf    /etc/nginx/conf.d/nginx.template.conf
COPY build /usr/share/nginx/html
COPY ./start.sh /etc/start.sh
RUN chmod +x /etc/start.sh
CMD /etc/start.sh
