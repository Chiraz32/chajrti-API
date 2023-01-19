import { Global, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './files');
        },
        filename: function (req, file, cb) {
          const name = file.originalname;
          cb(null, `${name}`);
        }
    })}),
  ],
  providers: [ClientService, JwtStrategy],
  controllers: [ClientController]
})
export class ClientModule {}
