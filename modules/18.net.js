import net from 'node:net';

const server = net.createServer((socket) => {
  console.log('Клиент подключился:', socket.remoteAddress, socket.remotePort);

  // Отправляем данные клиенту
  socket.write('Привет от сервера!\n');

  // Обрабатываем входящие данные от клиента
  socket.on('data', (data) => {
    console.log('Получено от клиента:', data.toString());
    socket.write('Сервер получил: ' + data);
  });

  // Обрабатываем отключение клиента
  socket.on('end', () => {
    console.log('Клиент отключился');
  });
});

// Слушаем порт 3000
server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

// Подключаемся к серверу
const client = net.connect({ port: 3000 }, () => {
  console.log('Подключено к серверу');
  client.write('Привет от клиента!');
});

// Получаем данные от сервера
client.on('data', (data) => {
  console.log('Получено от сервера:', data.toString());
  // Закрываем соединение после получения ответа
  client.end();
});

client.on('end', () => {
  console.log('Отключен от сервера');
});