FROM node:14-alpine

COPY ["package.json", "package-lock.json", "/app/"]

WORKDIR /app

RUN npm install --silent && \
  npm install react-scripts serve -g --silent

COPY ["./build", "/app/build"]

ENV PATH /app/node_modules/.bin:$PATH

ENTRYPOINT ["serve", "-s", "build"]

CMD ["-l", "3000"]