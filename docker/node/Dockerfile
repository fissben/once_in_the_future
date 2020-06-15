FROM node:12.18.0-alpine3.12

COPY ./build.sh /build.sh

RUN apk add --no-cache wget \
                       ca-certificates \
                       nano \
                       curl \
		               git \
                       openssh \
                       net-tools \
                       supervisor

COPY supervisord/supervisord.conf /etc/supervisord.conf

RUN  chmod +x /build.sh

WORKDIR /var/www/echo
