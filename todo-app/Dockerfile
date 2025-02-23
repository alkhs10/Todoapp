FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

RUN npm run build -- --configuration=production

FROM nginx:1.25-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/todo-app.conf
COPY --from=build /app/dist/todo-app /usr/share/nginx/html/todo-app
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
