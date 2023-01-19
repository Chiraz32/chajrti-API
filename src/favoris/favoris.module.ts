import { Global, Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { PlantModule } from 'src/plant/plant.module';
import { Favoris } from './entity/favoris.entity';
import { FavorisController } from './favoris.controller';
import { FavorisService } from './favoris.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Favoris])],
  controllers: [FavorisController],
  providers: [FavorisService],
})
export class FavorisModule {}
