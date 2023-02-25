import { Global, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entity/order.entity';
import { PlantModule } from 'src/plant/plant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantService } from 'src/plant/plant.service';
import { Plant } from 'src/plant/entity/plant.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Plant]),
  ],
  providers: [OrderService,PlantService],
  controllers: [OrderController]
})
export class OrderModule {}
