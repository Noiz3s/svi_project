import { Module } from '@nestjs/common';
import { TicketController } from './Controller/ticketController';
import { TicketService } from './Service/ticketService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
