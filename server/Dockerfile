FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]