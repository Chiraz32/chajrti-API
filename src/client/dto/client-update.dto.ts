import { Optional } from '@nestjs/common';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class ClientUpdateDto{

    @Optional()
    surname: string;
    
    @IsEmail()
    @Optional()
    email: string;

    @Optional()
    phoneNumber : number;

    @Optional()
    image : string;
}