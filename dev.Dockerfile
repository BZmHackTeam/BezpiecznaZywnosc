FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine as base

EXPOSE 80/tcp
EXPOSE 443/tcp

ENV USERNAME=meowie
ENV USER_UID=1000
ENV USER_GID=1001

RUN addgroup -g $USER_GID $USERNAME \
    && adduser -u $USER_UID -G $USERNAME -D $USERNAME

RUN mkdir -p /srv/log
RUN chown -R $USERNAME:$USERNAME /srv/log

VOLUME [ "/srv/log" ]

STOPSIGNAL SIGKILL

WORKDIR /source

FROM base AS api

USER $USERNAME
ENTRYPOINT [ "dotnet", "watch", "--project", "./src/Nyanlabs.SFood.Api", "run", "--", "--urls", "http://0.0.0.0:80" ]

FROM base AS ui

RUN apk add npm

USER $USERNAME
WORKDIR /source/src/Nyanlabs.SFood.UI/sfood
ENTRYPOINT [ "npm", "start" ]
