import { IsNotEmpty } from "class-validator";
import { Seller } from "src/seller/entity/seller.entity";
import { Plant} from "../entity/plant.entity";

export class addPlantDto{

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    price:number;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    seller:Seller;
}