FROM node:14.9.0-slim as build-stage

WORKDIR /frontend
COPY package*.json ./

RUN npm install
RUN npm install @vue/cli -g
COPY . .
RUN npm run build

#EXPOSE 8080
#CMD ["npm", "run", "serve"]

FROM nginx:1.16.1-alpine as production-stage
COPY --from=build-stage /frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]