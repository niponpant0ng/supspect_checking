FROM node:8.11.4-alpine

WORKDIR /usr/app
COPY package*.json ./

RUN npm install
COPY . .

ENV NODE_ENV production
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]