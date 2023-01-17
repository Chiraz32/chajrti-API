import { Global, Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
@Global()
@Module({
  controllers: [PlantController],
  providers: [PlantService]
})
export class PlantModule {}
