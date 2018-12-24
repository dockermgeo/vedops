FROM node

ENV MONGODB_HOST localhost

ADD app /app

WORKDIR /app
RUN npm install

ENTRYPOINT [ "node", "index.js"]
