# Используем официальный Node.js образ
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Копируем данные
COPY . .

# Устанавливаем зависимости
RUN npm install

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]

