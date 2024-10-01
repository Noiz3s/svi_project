import {
  Get,
  Post,
  Controller,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { TicketService } from '../Service/ticketService';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ticket } from '../entity/ticket';
import { TicketDTO } from '../DTO/ticketDTO';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly service: TicketService) {}

  @Get('All_tickets')
  @ApiResponse({
    status: 200,
    description: 'Returns all tickets',
    type: Ticket,
    isArray: true,
  })
  async GetAllTickets(): Promise<Ticket[]> {
    return this.service.GetAllTickets();
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns ticket',
    type: Ticket,
    isArray: false,
  })
  async GetTicket(@Param('id') id: number): Promise<Ticket> {
    return this.service.GetTicket(id);
  }

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'create ticket',
    type: Ticket,
    isArray: false,
  })
  async CreateTicket(@Body() ticketDTO: TicketDTO): Promise<Ticket> {
    return this.service.CreateTicket(ticketDTO);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'Update ticket',
    type: Ticket,
    isArray: true,
  })
  async SetTickets(
    @Param('id') id: number,
    @Body() updateTicketDTO: TicketDTO,
  ): Promise<Ticket> {
    return this.service.UpdateTicket(id, updateTicketDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete ticket',
    type: Ticket,
    isArray: true,
  })
  async DeleteTicket(@Param('id') id: number) {
    return this.service.DeleteTicket(id);
  }
}
