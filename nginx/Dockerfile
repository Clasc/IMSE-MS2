FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf -f

COPY nginx.conf /etc/nginx/conf.d/

RUN openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=mydomain.com" -addext "subjectAltName=DNS:imse-frontend" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt;
RUN openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=mydomain.com" -addext "subjectAltName=DNS:web-api" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned_api.key -out /etc/ssl/certs/nginx-selfsigned_api.crt;
