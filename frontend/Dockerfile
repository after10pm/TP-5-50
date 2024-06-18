FROM node:14.17.3

WORKDIR /frontend2/frontend

COPY package.json /frontend2/frontend/package.json
COPY package-lock.json /frontend2/frontend/package-lock.json

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]