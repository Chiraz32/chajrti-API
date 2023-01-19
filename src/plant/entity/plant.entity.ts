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
import { Seller } from 'src/seller/entity/seller.entity';

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


  @OneToMany((type) => Favoris, (Favoris) => Favoris.plant)

  @OneToMany((type) => Favoris, (Favoris) => Favoris.plant,{cascade:true})
  favoris: Favoris[];
  @OneToMany((type) => Order, (Order) => Order.plant,{cascade:true})
  orders: Order[];
  @ManyToOne((type) => Seller, (Seller) => Seller.plants,{cascade:true})
  @JoinColumn({name: 'seller',})

  seller: Seller;
}
