# BasedServer - mc-intosh's definitive server base
Contains the bare minimum (+ some useful bells and whistles that could be useful) for running a Docker-ized (as well as non-Docker) server using TypeScript.

## Deploy (with nginx) using Docker Compose
```yaml
name: basedserver-with-nginx
services:
  nginx:
    image: nginx
    ports:
      - 8080:80
    volumes: # remember to put your nginx configuration files here
      - ./nginx:/etc/nginx/conf.d:ro
    networks:
      - basedservernet
  backend:
    hostname: backend
    build:
      context: ./your-server-directory
      dockerfile: Dockerfile
    environment:
      BASEDSERVER_PORT: 80
      BASEDSERVER_BODY_SIZE_LIMIT: 10mb
      BASEDSERVER_PROJECT_NAME: DockerBasedServer
      BASEDSERVER_PROJECT_VERSION: "1.3"
      BASEDSERVER_SERVER_URL: 127.0.0.1
      BASEDSERVER_ENVIRONMENT: prod
      BASEDSERVER_IS_NGINX: "true"
    networks:
      - basedservernet
networks:
  basedservernet: {}
```