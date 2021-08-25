FROM node:14.17.3-alpine AS builder
WORKDIR /www/var
COPY package*.json ./
RUN npm i react-scripts -g
RUN npm i
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /www/var/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]