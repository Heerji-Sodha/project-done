FROM node:10

# Create app directory
RUN mkdir -p /srv/app/fe/src
RUN mkdir -p /srv/app/fe/public
WORKDIR /srv/app/fe

# Bundle app source
COPY ./public /srv/app/fe/public
COPY package.json /srv/app/fe/package.json
COPY . /srv/app/fe/src

RUN npm install
ENV PATH "$PATH:./node_modules/.bin"

CMD [ "npm", "start" ]

EXPOSE 3000