import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavorisModule } from 'src/favoris/favoris.module';
import { OrderModule } from 'src/order/order.module';
import { MulterModule } from '@nestjs/platform-express';
import { Plant } from './entity/plant.entity';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { diskStorage } from 'multer';
import { JwtStrategy } from 'src/client/strategy/passport-jwt.strategy';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Plant]),
  MulterModule.register({
    storage: diskStorage({
      destination: function (req, file, cb) {
        cb(null, './plantUploads');
      },
      filename: function (req, file, cb) {
        const name = file.originalname;
        cb(null, `${name}`);
      }
  })})],
  controllers: [PlantController],
  providers: [PlantService]
})
export class PlantModule {}
