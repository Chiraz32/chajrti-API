import { Global, Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
@Global()
@Module({
  controllers: [SellerController],
  providers: [SellerService]
})
export class SellerModule {}
