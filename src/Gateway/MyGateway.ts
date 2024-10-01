import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConcertService } from 'src/entity/Concert/Service/ConcertService'; // Подставьте ваш сервис работы с концертами

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class MyGateway {
  constructor(private concertService: ConcertService) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
    // Отправляем информацию о текущих концертах при подключении клиента
    const concerts = await this.concertService.GetAllConcerts();
    client.emit('initialConcerts', concerts);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  async notifyNewConcert(concert: any) {
    // Оповещаем всех подключенных клиентов о появлении нового концерта
    this.server.emit('newConcert', concert);
  }
}
