import { Optional } from '@nestjs/common';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class ClientUpdateDto{

    @IsNotEmpty()
    surname: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Optional()
    phoneNumber : number;
}