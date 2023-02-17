import {IsEmail, IsNotEmpty} from 'class-validator';

export class ClientInscritDto{

    @IsNotEmpty()
    surname: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    mdp: string;

    @IsNotEmpty()
    phoneNumber : string;
}
