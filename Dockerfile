FROM node:12 as builder-image

RUN npm i -g @angular/cli@11.0.4

WORKDIR /src/app

COPY . .

RUN npm install

EXPOSE 4200

CMD ng serve --host 0.0.0.0 
