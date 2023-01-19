import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantModule } from 'src/plant/plant.module';
import { Seller } from './entity/seller.entity';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Seller]),
   
  ]
  ,
  controllers: [SellerController],
  providers: [SellerService]
})
export class SellerModule {}
