FROM nginx:alpine

# ensure it's not public via http://localhost:8080/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/

EXPOSE 80