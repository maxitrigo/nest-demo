FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run build && npm run typeorm migration:run -- -d ./dist/src/config/typeorm.config.js && npm run start"]


