FROM node:lts-alpine as cyber1_cadastro
WORKDIR /app
COPY package.json  /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=cyber1_cadastro app/dist/cyber1-cadastro/browser /usr/share/nginx/html
COPY ./config/nginx.conf etc/nginx/conf.d/default.conf

# docker build -t cyber1_cadastro .
# docker run -p 8080:80 cyber1_cadastro

