import { Optional } from '@nestjs/common';
export class PlantUpdateDto{

    @Optional()
    name : string;

    @Optional()
    price: number;

    @Optional()
    description:string;

}