import {
  IsNotEmpty,
} from 'class-validator';
import { Client } from 'src/client/entity/client.entity';
import { Plant } from 'src/plant/entity/plant.entity';
export class addFavorisDto {
    
  @IsNotEmpty() 
  client: Client;

  @IsNotEmpty()
  plant: Plant;
}
