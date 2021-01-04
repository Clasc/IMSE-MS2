FROM node:14.9.0-slim

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "serve"]
