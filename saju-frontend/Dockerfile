FROM nginx:latest
WORKDIR /app
COPY build/ /app/build
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]