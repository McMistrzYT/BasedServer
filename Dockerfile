# i use the slim image of node 16 to reduce image size from ~941 MB to ~211 MB
FROM node:16-slim

WORKDIR /server
COPY . .

# create the javascript code cuz better than typescript
RUN npm install && npm run build

CMD [ "node", "bin/index.js" ]