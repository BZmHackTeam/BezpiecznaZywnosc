FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build

RUN apk add npm

WORKDIR /source

COPY src/Nyanlabs.SFood.UI/sfood/package*.json src/Nyanlabs.SFood.UI/sfood/

RUN 

COPY Nyanlabs.SFood.sln ./

COPY src/Nyanlabs.SFood.Api/*.csproj ./src/Nyanlabs.SFood.Api/
COPY src/Nyanlabs.SFood.UI/*.csproj ./src/Nyanlabs.SFood.UI/
COPY test/Nyanlabs.SFood.Test/*.csproj ./test/Nyanlabs.SFood.Test/

RUN dotnet restore

COPY src/Nyanlabs.SFood.Api/. ./src/Nyanlabs.SFood.Api/
COPY src/Nyanlabs.SFood.UI/. ./src/Nyanlabs.SFood.UI/

RUN dotnet test --no-restore

RUN dotnet publish ./src/Nyanlabs.SFood.Api/ -c Release -o /build/api
RUN dotnet publish ./src/Nyanlabs.SFood.UI/ -c Release -o /build/ui

FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS api

# Files

COPY --from=build /build/api /srv

VOLUME [ "/srv/log" ]

WORKDIR /srv

ENV ASPNETCORE_ENVIRONMENT=Production

# Net

EXPOSE 80/tcp

# Process handling

STOPSIGNAL SIGTERM

ENTRYPOINT [ "dotnet", "/srv/Nyanlabs.SFood.Api.dll" ]

FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS ui

# Files

COPY --from=build /build/ui /srv

VOLUME [ "/srv/log" ]

WORKDIR /srv

ENV ASPNETCORE_ENVIRONMENT=Production

# Net

EXPOSE 80/tcp

# Process handling

STOPSIGNAL SIGTERM

ENTRYPOINT [ "dotnet", "/srv/Nyanlabs.SFood.UI.dll" ]
