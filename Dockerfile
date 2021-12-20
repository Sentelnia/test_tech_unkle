FROM node:14-alpine


WORKDIR /app

#construire dossier nodemodules
COPY package*.json ./
RUN npm install

#copier fichiers locaux 
COPY . ./


EXPOSE 3030

CMD ["npm", "start"]

