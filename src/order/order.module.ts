import { Global, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
@Global()
@Module({
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
