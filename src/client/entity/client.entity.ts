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
  Unique,
} from 'typeorm';
import repository from 'typeorm/repository/Repository';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({})
  surname: string;
  @Column()
  @Unique('email', ['email']) // u
  email: string;
  @Column({})
  mdp: string;
  @Column({})
  salt: string;
  @Column({
    default: 'default.png',
  })
  image: string;
  @Column({})
  phoneNumber: number;

  @OneToMany((type) => Order, (Order) => Order.client)
  orders: Order[];

  @OneToMany((type) => Favoris, (Favoris) => Favoris.client)
  favoris: Favoris[];
}
