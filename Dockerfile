# build static react app
FROM node:16.15.0-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# put static react into nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=build /app/build .
# COPY ./default.conf /etc/nginx/conf.d/default.conf
# COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]


# command to run app
# docker run -dp 8080:80 postitclient



# SRC: https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/
