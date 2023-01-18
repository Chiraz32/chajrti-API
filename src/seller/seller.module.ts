import { Global, Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entity/seller.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Seller]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [SellerController, JwtStrategy],
  providers: [SellerService]
})
export class SellerModule {}
