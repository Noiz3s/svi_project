import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TicketStatus } from './ticketStatus';
import { ApiProperty } from '@nestjs/swagger';
import { Concert } from '../../Concert/entity/concert';
import { Order } from '../../Order/entity/order';

@Entity()
export class Ticket {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Concert, (concert) => concert.tickets)
  @JoinColumn({ name: 'concertid' })
  concertid: number;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.tickets)
  @JoinColumn({ name: 'orderid' })
  orderid: number;

  @ApiProperty()
  @Column()
  row: number;

  @ApiProperty()
  @Column()
  place: number;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.FREE,
  })
  status: TicketStatus;
}
