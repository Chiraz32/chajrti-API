import { Order } from 'src/order/entity/order.entity';
import { Favoris } from 'src/favoris/entity/favoris.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { Client } from 'src/client/entity/client.entity';
import { ClientService } from 'src/client/client.service';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @OneToMany((type) => Favoris, (Favoris) => 
  Favoris.plant)

  @OneToMany((type) => Favoris, (Favoris) => 
  Favoris.plant,{cascade:true})
  favoris: Favoris[];
  @OneToMany((type) => Order, (Order) => 
  Order.plant,{cascade:true})
  orders: Order[];
 
  @ManyToOne((type)=>Client,client=> client.plants)
  client : Client;
 
}
