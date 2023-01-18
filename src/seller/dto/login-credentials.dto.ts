import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginCredetialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  mdp: string;
}