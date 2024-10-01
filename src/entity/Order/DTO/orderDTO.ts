import { OrderStatus } from '../entity/orderStatus';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { TicketDTO } from '../../Ticket/DTO/ticketDTO';

export class OrderDTO {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsArray()
  tickets: TicketDTO[];
}
