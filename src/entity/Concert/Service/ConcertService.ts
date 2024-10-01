import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from '../entity/concert';
import { ConcertDTO } from '../DTO/concertDTO';
import { Ticket } from '../../Ticket/entity/ticket';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async GetAllConcerts(): Promise<Concert[]> {
    return this.concertRepository.find();
  }
  async GetConcert(id: number): Promise<Concert | null> {
    return this.concertRepository.findOne({ where: { id } });
  }
  async GetTickets(id: number): Promise<Ticket[]> {
    const concert = await this.concertRepository.findOne({ where: { id } });
    return await concert.tickets;
  }

  async CreateConcert(createConcertDTO: ConcertDTO): Promise<Concert> {
    const newConcert = this.concertRepository.create(createConcertDTO);
    return this.concertRepository.save(newConcert);
  }

  async UpdateConcert(
    id: number,
    updateConcertDTO: ConcertDTO,
  ): Promise<Concert> {
    await this.concertRepository.update(id, updateConcertDTO);
    return this.concertRepository.findOne({ where: { id } });
  }

  async DeleteConcert(id: number) {
    await this.concertRepository.delete(id);
  }
}
