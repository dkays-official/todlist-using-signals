# Stage 1: Build the Angular application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build --prod
RUN echo "Contents of /app/dist/to-do-list after build:"
RUN ls -al /app/dist/to-do-list

# Stage 2: Serve the built application with nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf # Remove default config file
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/to-do-list/. /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]