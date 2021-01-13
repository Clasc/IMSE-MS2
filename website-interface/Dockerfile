FROM node:14.9.0-slim
WORKDIR /web-api
COPY package*.json ./

RUN npm install --loglevel=error

COPY . .

EXPOSE 8081
CMD [ "npm", "run", "dev" ]