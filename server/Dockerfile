FROM node:10

# Create app directory
RUN mkdir -p /srv/app/srv
WORKDIR /srv/app/srv

# Install app dependencies
#COPY package.json /srv/app/srv
#RUN npm install

# Bundle app source
COPY . /srv/app/srv

RUN npm install
RUN npm install @azure/cosmos
RUN npm install body-parser
RUN npm install cookie-parser
RUN npm install cors
RUN npm install express
RUN npm install jade
RUN npm install lodash
RUN npm install morgan
RUN npm install react
RUN npm install react-dom
RUN npm install cross-fetch
RUN npm install firebase-admin

CMD [ "node", "server.js" ]

EXPOSE 3001