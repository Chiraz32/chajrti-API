import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Client } from 'src/client/entity/client.entity';
import { Plant } from 'src/plant/entity/plant.entity';
export class addFavorisDto {
    
  @IsNotEmpty() 
  client: Client;

  @IsNotEmpty()
  plant: Plant;
}
