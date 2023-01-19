import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { Seller } from '../entity/seller.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secret",
    });
  }

  async validate(payload: PayloadInterface) {
    const seller = await this.sellerRepository.createQueryBuilder('seller')
    .where('seller.email = :email', {email: payload.email}).getOne();

    if(seller){
        delete seller.mdp;
        delete seller.salt;
        return seller;
    }else{
        throw new UnauthorizedException();
    }
  }
}