import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './orderStatus';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../User/entity/user';
import { Ticket } from '../../Ticket/entity/ticket';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.orders, { lazy: true })
  user: Promise<User>;

  @ApiProperty()
  @Column()
  buyer: number;

  @ApiProperty()
  @OneToMany(() => Ticket, (ticket) => ticket.orderid)
  tickets: Promise<Ticket[]>;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  status: OrderStatus;
}
