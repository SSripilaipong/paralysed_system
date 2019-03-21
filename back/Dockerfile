FROM node:latest
RUN mkdir -p /backend-dir-inside-container
WORKDIR /backend-dir-inside-container
COPY package.json /backend-dir-inside-container/package.json
COPY package-lock.json /backend-dir-inside-container/package-lock.json
RUN npm install --save express
RUN npm install

ENV PORT 8080

EXPOSE 8080