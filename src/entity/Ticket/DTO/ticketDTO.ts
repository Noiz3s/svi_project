import { TicketStatus } from '../entity/ticketStatus';
import { IsDecimal, IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class TicketDTO {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  row: number;

  @IsInt()
  concertid: number;

  @IsNotEmpty()
  @IsInt()
  place: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
