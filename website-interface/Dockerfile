FROM node:14.9.0-slim
WORKDIR /website
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081
CMD [ "npm", "run", "dev" ]