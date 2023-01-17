import { Global, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
@Global()
@Module({
  providers: [ClientService],
  controllers: [ClientController]
})
export class ClientModule {}
