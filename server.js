const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Новое соединение: ', socket.id);

  // Обработка событий сокетов здесь

  socket.on('message', (data) => {
    console.log('Сообщение от сервера:', data);
  });

  // Отправляем сообщение на сервер
  socket.emit('message', 'Привет, сервер!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
