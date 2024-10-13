import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
    // Проверяем авторизацию клиента
    if (!this.isAuthenticated(client)) {
      console.log('Unauthorized client');
      client.emit('unauthorized', 'You are not authorized to connect');
      client.disconnect();
      return;
    }
    // Отправляем уведомление о успешном подключении клиенту
    client.emit(
      'connectionSuccess',
      'You have successfully connected to the server',
    );
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
    // Отправляем уведомление о отключении клиента
    client.emit(
      'connectionClosed',
      'You have been disconnected from the server',
    );
  }

  // Функция для проверки авторизации клиента
  private   isAuthenticated(client: any): boolean {
    return true; // Замените это на вашу реальную логику авторизации
  }
}
