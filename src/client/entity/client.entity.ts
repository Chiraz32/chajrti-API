import { type } from 'os';
import { Favoris } from 'src/favoris/entity/favoris.entity';
import { Order } from 'src/order/entity/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({})
  surname: string;
  @PrimaryColumn({})
  email: string;
  @Column({})
  mdp: string;
  @OneToMany((type) => Order, (Order) => Order.client)
  orders: Order[];
  @OneToMany((type) => Favoris, (Favoris) => Favoris.idClient)
  favoris: Favoris[];
}
