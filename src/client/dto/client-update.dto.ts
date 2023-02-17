import { Optional } from '@nestjs/common';
import {IsEmail} from 'class-validator';

export class ClientUpdateDto{

    @Optional()
    surname: string;
    
    @IsEmail()
    @Optional()
    email: string;

    @Optional()
    phoneNumber : string;

    @Optional()
    image : string;
}