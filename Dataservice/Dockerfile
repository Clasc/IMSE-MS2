FROM node:14.9.0-slim
WORKDIR /app
COPY package*.json /app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app/


EXPOSE 8000
CMD [ "npm", "start" ]