import {
  Get,
  Post,
  Controller,
  Body,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ConcertService } from '../Service/ConcertService';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Concert } from '../entity/concert';
import { ConcertDTO } from '../DTO/concertDTO';
import { MyGateway } from '../../../Gateway/MyGateway';
import { Ticket } from '../../Ticket/entity/ticket';

@ApiTags('concert')
@Controller('concert')
export class ConcertController {
  constructor(private readonly service: ConcertService) {}

  @Get('All_concerts')
  @ApiResponse({
    status: 200,
    description: 'Returns all concerts',
    type: Concert,
    isArray: true,
  })
  async GetAllConcerts(): Promise<Concert[]> {
    return this.service.GetAllConcerts();
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns concert',
    type: Concert,
    isArray: false,
  })
  async GetConcert(@Param('id') id: number): Promise<Concert> {
    return this.service.GetConcert(id);
  }

  @Get(':id/tickets')
  @ApiResponse({
    status: 200,
    description: 'Returns tickets',
    type: Ticket,
    isArray: true,
  })
  async GetTickets(@Param('id') id: number): Promise<Ticket[]> {
    return this.service.GetTickets(id);
  }

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'create concert',
    type: Concert,
    isArray: false,
  })
  async CreateConcert(@Body() concertDTO: ConcertDTO): Promise<Concert> {
    return this.service.CreateConcert(concertDTO);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'Update concert',
    type: Concert,
    isArray: true,
  })
  async UpdateConcert(
    @Param('id') id: number,
    @Body() updateConcertDTO: ConcertDTO,
  ): Promise<Concert> {
    return this.service.UpdateConcert(id, updateConcertDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete Concert',
    type: Concert,
    isArray: true,
  })
  async DeleteConcert(@Param('id') id: number) {
    return this.service.DeleteConcert(id);
  }
}
