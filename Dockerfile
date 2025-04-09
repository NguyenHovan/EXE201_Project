FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build && npm install -g serve
EXPOSE 8080

# Chạy server production (vite preview)

CMD ["serve", "-s", "dist", "-l", "8080"]