import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../Ticket/entity/ticket';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Concert {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @OneToMany(() => Ticket, (ticket) => ticket.concertid)
  tickets: Promise<Ticket[]>;
}
