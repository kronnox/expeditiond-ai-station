### STAGE 1: Build ###
FROM node:16.10-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY .. .
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/wot-frontend /usr/share/nginx/html
