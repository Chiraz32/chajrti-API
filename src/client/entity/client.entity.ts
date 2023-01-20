import { type } from 'os';
import { UserRoleEnum } from 'src/enum/userRole.Enum';
import { Favoris } from 'src/favoris/entity/favoris.entity';
import { Order } from 'src/order/entity/order.entity';
import { Plant } from 'src/plant/entity/plant.entity';
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
  name: string;
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
  
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.Buyer,
  })
  role :string;
  @OneToMany((type) => Order, (Order) => Order.client,{cascade:true})
  orders: Order[];
 

  @OneToMany((type) => Favoris, (Favoris) => Favoris.client,{cascade:true})
  favoris: Favoris[];

  @OneToMany( (type)=> Plant, plant=>plant.client ,{cascade:true})
  plants :Plant[];
}
