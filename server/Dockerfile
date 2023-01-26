FROM node:alpine

WORKDIR /app

COPY package.json . 

RUN yarn install --only=prod 
# so dev modules are not added in container 

COPY . .

CMD ["yarn" , "dev"]