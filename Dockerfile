FROM  node:18-alpine AS build
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . .
RUN npm run build --prod



