import { IsNotEmpty } from "class-validator";

import { Plant} from "../entity/plant.entity";

export class addPlantDto{

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    price:number;

    @IsNotEmpty()
    description:string;

  
}