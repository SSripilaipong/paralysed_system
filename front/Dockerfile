FROM node:latest
RUN mkdir -p /frontend-dir-inside-container
WORKDIR /frontend-dir-inside-container
COPY package.json /frontend-dir-inside-container/package.json
COPY package-lock.json /frontend-dir-inside-container/package-lock.json
# RUN npm install webpack -g
RUN npm install create-react-app -g
RUN npm install --save react-scripts -g
# RUN npm install axios -g
RUN npm install

EXPOSE 3000