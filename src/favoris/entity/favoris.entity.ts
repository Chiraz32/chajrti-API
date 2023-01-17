import { Client } from 'src/client/entity/client.entity';
import { Plant } from 'src/plant/entity/plant.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Favoris {
  @PrimaryColumn()
  id: number;
  @ManyToOne((type) => Client, (Client) => Client.favoris)
  idClient: Client;
  @ManyToOne((type) => Plant, (Plant) => Plant.favoris)
  @JoinColumn({name: 'idPlant' })
  idPlant: Plant;
}
