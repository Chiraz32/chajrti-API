import { Global, Module } from '@nestjs/common';
import { FavorisController } from './favoris.controller';
import { FavorisService } from './favoris.service';
@Global()
@Module({
  controllers: [FavorisController],
  providers: [FavorisService]
})
export class FavorisModule {}
