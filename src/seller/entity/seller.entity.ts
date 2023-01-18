import { Plant } from 'src/plant/entity/plant.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  surname: string;
  @Column()
  @Unique('email', ['email']) // u
  email: string;
  @Column()
  mdp: string;
  @Column({})
  salt: string;
  @Column({})
  image: string;
  @Column({})
  phoneNumber: number;
  @OneToMany((type) => Plant, (plant) => plant.seller)
  plants: Plant[];
}
