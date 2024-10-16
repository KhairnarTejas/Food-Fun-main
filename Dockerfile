#Sample Dockerfile for NodeJS Apps

FROM node:20

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT 3000

EXPOSE 3000

CMD [ "node", "app.js" ] 
