import {
  Get,
  Post,
  Controller,
  Body,
  Delete,
  ValidationPipe,
  UsePipes,
  Param,
  Put,
} from '@nestjs/common';
import { OrderService } from '../Service/OrderService';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '../entity/order';
import { OrderDTO } from '../DTO/orderDTO';
import { emailer, Emailer } from '../../../Email/sendEmail';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly service: OrderService,
    private readonly emailer: Emailer,
  ) {}

  @Get('All_orders')
  @ApiResponse({
    status: 200,
    description: 'Returns all orders',
    type: Order,
    isArray: true,
  })
  async GetAllOrders(): Promise<Order[]> {
    return this.service.GetAllOrders();
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns order',
    type: Order,
    isArray: false,
  })
  async GetOrder(@Param('id') id: number): Promise<Order> {
    return this.service.GetOrder(id);
  }

  @Post('create/:email')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    description: 'create order',
    type: Order,
    isArray: false,
  })
  async CreateOrder(
    @Body() OrderDTO: OrderDTO,
    @Param('email') email: string,
  ): Promise<Order> {
    const order = this.service.CreateOrder(OrderDTO);
    emailer.notifyUserForOrder(email);
    return order;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'Update order',
    type: Order,
    isArray: true,
  })
  async UpdateOrder(
    @Param('id') id: number,
    @Body() updateOrderDTO: OrderDTO,
  ): Promise<Order> {
    return this.service.UpdateOrder(id, updateOrderDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete Order',
    type: Order,
    isArray: true,
  })
  async DeleteOrder(@Param('id') id: number) {
    return this.service.DeleteOrder(id);
  }
}
