# auth-service/Dockerfile
FROM node:20

# Installer des dépendances nécessaires pour compiler bcrypt
# RUN apt-get update && apt-get install -y build-essential python3

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]