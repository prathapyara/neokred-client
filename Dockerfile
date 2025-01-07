FROM node:alpine3.18 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "build"]

FROM nginx:1.27.3-apline
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx","-g","daemon off;"]