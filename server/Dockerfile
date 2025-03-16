FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY .env* ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "--experimental-specifier-resolution=node", "dist/main.js"]
