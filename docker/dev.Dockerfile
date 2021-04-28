FROM node:14-alpine

COPY ["package.json", "package-lock.json", "/app/"]

WORKDIR /app

RUN npm install --silent && \ 
  npm install react-scripts -g --silent

COPY [".", "/app/"]

ENV PATH /app/node_modules/.bin:$PATH

CMD ["npm", "start"]