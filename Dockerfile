FROM node:latest as builder

WORKDIR /app

COPY . .

RUN npm install && npm run ng build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/poke-api .

ENTRYPOINT ["nginx", "-g", "daemon off;"]