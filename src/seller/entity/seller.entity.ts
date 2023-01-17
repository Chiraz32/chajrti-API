import { Plant } from 'src/plant/entity/plant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  surname: string;
  @Column()
  email: string;
  @Column()
  mdp: string;
  @OneToMany((type) => Plant, (plant) => plant.seller)
  plants: Plant[];
}
