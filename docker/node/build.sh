#!/bin/bash

cd /var/www/echo && npm i
if [ ! -f /var/www/echo/.env ]
    then
    cp /var/www/echo/.env.example /var/www/echo/.env
fi

#to run as in supervisord
#/usr/bin/supervisord -c /etc/supervisord.conf

node app.js

#/bin/sh
