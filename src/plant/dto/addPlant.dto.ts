import { IsNotEmpty } from "class-validator";
import { Client } from "src/client/entity/client.entity";

import { Plant} from "../entity/plant.entity";

export class addPlantDto{

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    price:number;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    client : Client;
  
}