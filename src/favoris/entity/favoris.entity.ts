import { Client } from 'src/client/entity/client.entity';
import { Plant } from 'src/plant/entity/plant.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Favoris {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Client, (Client) => Client.favoris, {
   
    // nullable: true,
    // eager: true,
  })
  client: Client;
  @ManyToOne((type) => Plant, (Plant) => Plant.favoris, {
   
    // nullable:true,
    // eager: true,
  })
  plant: Plant;
}
