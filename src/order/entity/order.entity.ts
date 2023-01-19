import { type } from 'os';
import { Client } from 'src/client/entity/client.entity';
import { OrderStateEnum } from 'src/enum/orderState.enum';
import { Plant } from 'src/plant/entity/plant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStateEnum,
    default: OrderStateEnum.PENDING
  })
  state: string;

  @ManyToOne((type) => Client, (Client) => Client.orders, {
    cascade: true,
    // eager: true,
  })
  client: Client;
  
  @ManyToOne((type) => Plant, (Plant) => Plant.orders, {
    cascade: true,
    // eager: true,
  })
  plant: Plant;
}
