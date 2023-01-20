import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/client/Guards/jwt-auth.guard';
import { User } from 'src/decorators/client.decorator';
import { addOrderDto } from './Dto/addOrder.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    
    constructor(private orderService: OrderService) {}

    @Get('allByClient')
    @UseGuards(JwtAuthGuard)
    async getOrderByClient(@User()user): Promise<Order[]> {
      return await this.orderService.getOrderByClient(user);
    }
    @Get('all')
    async getOrders(): Promise<Order[]> {
      return await this.orderService.getOrders();
    }
    @Get('allBySeller')
    @UseGuards(JwtAuthGuard)
    async getOrderBySeller(@User() user): Promise<Order[]> {
      return await this.orderService.getOrderBySeller(user);
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
