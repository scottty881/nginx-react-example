#!/bin/bash

envsubst '$PORT' < /etc/nginx/conf.d/nginx.template.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
