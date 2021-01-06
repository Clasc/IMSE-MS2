FROM node:14.9.0-slim

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install @vue/cli -g
COPY . .

EXPOSE 8080
CMD ["npm", "run", "serve"]