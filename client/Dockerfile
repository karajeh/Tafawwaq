FROM node:20-slim AS build
WORKDIR /usr
COPY package.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
