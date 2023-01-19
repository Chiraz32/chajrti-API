import { Global, Module } from '@nestjs/common';
import { PlantModule } from 'src/plant/plant.module';
import { Seller } from './entity/seller.entity';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
@Global()
@Module({
  // imports: [
  //   TypeOrmModule.forFeature([Seller]),
  //   PassportModule.register({defaultStrategy: 'jwt'}),
  //   JwtModule.register({
  //     secret: 'secret',
  //     signOptions: {
  //       expiresIn: 3600
  //     }
  //   }),
  //   MulterModule.register({
  //     storage: diskStorage({
  //       destination: function (req, file, cb) {
  //         cb(null, './files');
  //       },
  //       filename: function (req, file, cb) {
  //         const name = file.originalname;
  //         cb(null, `${name}`);
  //       }
  //   })}),
  // ],
  controllers: [SellerController,
    // JwtStrategy
  ],

  providers: [SellerService]
})
export class SellerModule {}