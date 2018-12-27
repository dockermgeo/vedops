FROM node

ENV MONGODB_HOST localhost
ENV DISABLE_API false


ADD app /app

WORKDIR /app
RUN npm install && npm run setup

ENTRYPOINT [ "node", "index.js"]
