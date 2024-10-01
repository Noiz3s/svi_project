import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../Order/entity/order';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  hashPassword: string;

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.user, { lazy: true })
  orders: Promise<Order[]>;

  @ApiProperty()
  @Column()
  isadmin : boolean = false;
}
