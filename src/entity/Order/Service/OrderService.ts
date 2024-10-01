import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order';
import { Repository } from 'typeorm';
import { OrderDTO } from '../DTO/orderDTO';
import { Ticket } from '../../Ticket/entity/ticket';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async GetAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }
  async GetOrder(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async CreateOrder(createOrderDTO: OrderDTO): Promise<Order> {
    const savedOrder = new Order();
    savedOrder.date = new Date(createOrderDTO.date);
    savedOrder.status = createOrderDTO.status;
    savedOrder.price = createOrderDTO.price;
    savedOrder.tickets = new Promise<Ticket[]>(async () => {
      createOrderDTO.tickets.forEach((ticket) =>
        this.ticketRepository.findOne({ where: { id: ticket.id } }),
      );
    });

    await this.orderRepository.save(savedOrder);
    return savedOrder;
  }

  async UpdateOrder(id: number, updateOrderDTO: OrderDTO): Promise<Order> {
    // await this.orderRepository.update(id, updateOrderDTO);
    return this.orderRepository.findOne({ where: { id } });
  }

  async DeleteOrder(id: number) {
    await this.orderRepository.delete(id);
  }
}
