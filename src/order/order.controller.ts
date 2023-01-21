import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/client/Guards/jwt-auth.guard';
import { User } from 'src/decorators/client.decorator';
import { addOrderDto } from './Dto/addOrder.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    
    constructor(private orderService: OrderService) {}

    // @Get('allByClient')
    // @UseGuards(JwtAuthGuard)
    // async getOrderByClient(@User()user): Promise<Order[]> {
    //   return await this.orderService.getOrderByClient(user);
    // }
    @Get('all')
    async getOrders(@User() user): Promise<Order[]> {
      return await this.orderService.getOrders(user);
    }
    // @Get('allBySeller')
    // @UseGuards(JwtAuthGuard)
    // async getOrderBySeller(@User() user): Promise<Order[]> {
    //   return await this.orderService.getOrderBySeller(user);
    // }
  
    @Post(':id')
    async addOrder(@Body() Order: addOrderDto,@User() user): Promise<Order> {
      return await this.orderService.addOrder(Order,user);
    }
  
    @Delete(':id')
    async deleteOrder(@Param('id', ParseIntPipe) id: number,@User() user) {
      return this.orderService.deleteOrder(id,user);
    }
    @Patch('accept/:id')
    async acceptOrder(@Param('id', ParseIntPipe) id: number,@User() user) {
        return this.orderService.acceptOrder(id,user);
      }
      @Patch('refuse/:id')
      async refuseOrder(@Param('id', ParseIntPipe) id: number,@User() user) {
          return this.orderService.refuseOrder(id,user);
        }
}
