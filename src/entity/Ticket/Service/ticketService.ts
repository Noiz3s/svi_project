import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entity/ticket';
import { TicketDTO } from '../DTO/ticketDTO';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async GetAllTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }
  async GetTicket(id: number): Promise<Ticket | null> {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async CreateTicket(createTicketDTO: TicketDTO): Promise<Ticket> {
    const newTicket = this.ticketRepository.create(createTicketDTO);
    return this.ticketRepository.save(newTicket);
  }

  async UpdateTicket(id: number, updateTicketDTO: TicketDTO): Promise<Ticket> {
    await this.ticketRepository.update(id, updateTicketDTO);
    return this.ticketRepository.findOne({ where: { id } });
  }

  async DeleteTicket(id: number) {
    await this.ticketRepository.delete(id);
  }
}
