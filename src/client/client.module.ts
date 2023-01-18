import { Global, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  providers: [ClientService, JwtStrategy],
  controllers: [ClientController]
})
export class ClientModule {}
