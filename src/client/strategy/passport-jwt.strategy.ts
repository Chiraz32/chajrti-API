import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { Client } from '../entity/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secret",
    });
  }

  async validate(payload: PayloadInterface) {
    const client = await this.clientRepository.createQueryBuilder('client')
    .where('client.email = :email', {email: payload.email}).getOne();

    if(client){
        delete client.mdp;
        delete client.salt;
    }else{
        throw new UnauthorizedException();
    }
  }
}