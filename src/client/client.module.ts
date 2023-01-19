import { Global, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entity/client.entity';
import { OrderModule } from 'src/order/order.module';
import { FavorisModule } from 'src/favoris/favoris.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),    
  ],
  providers: [ClientService],
  controllers: [ClientController]
})
export class ClientModule {}
