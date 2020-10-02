FROM node:10

RUN npm config set user 0 &&\
    npm config set unsafe-perm true &&\
    npm install ethereum-hdwallet

CMD ["ethereum_hdwallet"]
