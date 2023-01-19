import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { addOrderDto } from './Dto/addOrder.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    
    constructor(private orderService: OrderService) {}

    @Get('all')
    async getOrderByClient(): Promise<Order[]> {
      return await this.orderService.getOrderByClient();
    }
  
    @Post('add')
    async addOrder(@Body() Order: addOrderDto): Promise<Order> {
      return await this.orderService.addOrder(Order);
    }
  
    @Delete(':id')
    async deleteOrder(@Param('id', ParseIntPipe) id: number) {
      return this.orderService.deleteOrder(id);
    }
    @Patch('accept/:id')
    async acceptOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.acceptOrder(id);
      }
      @Patch('refuse/:id')
      async refuseOrder(@Param('id', ParseIntPipe) id: number) {
          return this.orderService.refuseOrder(id);
        }
}
