 FROM node:16-alpine as build-stage

WORKDIR /app
COPY package.json /app/

RUN npm install

COPY . ./



RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

COPY --from=build-stage /app/dist/spat /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/environments/config.template.json > /usr/share/nginx/html/assets/environments/config.json && nginx -g 'daemon off;'"]
