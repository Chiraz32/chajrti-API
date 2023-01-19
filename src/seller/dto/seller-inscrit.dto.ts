import {IsEmail, IsNotEmpty} from 'class-validator';

export class SellerInscritDto{

    @IsNotEmpty()
    surname: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    mdp: string;
}
