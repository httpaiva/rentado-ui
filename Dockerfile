# Use uma imagem oficial do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Construa o projeto
RUN npm run build

# Exponha a porta que o Next.js usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
