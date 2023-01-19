import { Global, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entity/order.entity';
import { PlantModule } from 'src/plant/plant.module';
import { ClientModule } from 'src/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
   
    
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
