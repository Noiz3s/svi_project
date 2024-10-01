import { Module } from '@nestjs/common';
import { OrderController } from './Controller/OrderController';
import { OrderService } from './Service/OrderService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order';
import { Ticket } from '../Ticket/entity/ticket';
import { TicketModule } from '../Ticket/ticketModule';
import { Emailer } from '../../Email/sendEmail';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Ticket]), TicketModule],
  controllers: [OrderController],
  providers: [OrderService, TicketModule, Emailer],
})
export class OrderModule {}
