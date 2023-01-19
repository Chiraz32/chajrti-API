import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavorisModule } from 'src/favoris/favoris.module';
import { OrderModule } from 'src/order/order.module';
import { SellerModule } from 'src/seller/seller.module';
import { Plant } from './entity/plant.entity';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Plant]),
    SellerModule,
    OrderModule,
    FavorisModule,
    
  ],
  controllers: [PlantController],
  providers: [PlantService]
})
export class PlantModule {}
