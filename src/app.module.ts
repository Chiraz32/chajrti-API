import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantModule } from './plant/plant.module';
import { OrderModule } from './order/order.module';
import { FavorisModule } from './favoris/favoris.module';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PlantModule,
    OrderModule,
    FavorisModule,
    ClientModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chajarti',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
