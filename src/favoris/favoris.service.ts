import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from 'src/enum/userRole.Enum';
import { Repository } from 'typeorm';
import { addFavorisDto } from './dto/addFavoris.dto';
import { Favoris } from './entity/favoris.entity';

@Injectable()
export class FavorisService {
  constructor(
    @InjectRepository(Favoris)
    private favorisRepository: Repository<Favoris>,
  ) {}

  async getFavorisByClient(user): Promise<Favoris[]> {
    if (user.role === UserRoleEnum.Buyer)
      return await this.favorisRepository.find({
        where: { 
           client : user
         },
        relations: {
          plant: true,
          client: true,
        },
      });
    else if (user.role === UserRoleEnum.Admin) {
      return await this.favorisRepository.find(
        {relations: {
          plant: true,
          client: true,
        },}
      );
    } else {
      throw new UnauthorizedException(`You can't see favoris list`);
    }
  }

  async addFavoris(favoris: addFavorisDto, user): Promise<Favoris> {
    if (
      (user.role === UserRoleEnum.Buyer ) ||
      user.role === UserRoleEnum.Admin
    ) {
      const newFavoris = this.favorisRepository.create(favoris);
    
      return await this.favorisRepository.save(newFavoris);
       
    } else {
      throw new UnauthorizedException(`You can't add to this favoris`);
    }
  }

  async deleteFavoris(id: number, user) {
    const toDelete = await this.favorisRepository.findOne({
      where: { id: id },
      relations: {
        plant: true,
        client: true,
      },
    });
    if (!toDelete) {
      throw new NotFoundException(`This favoris doesn't exist`);
    } else {
      if (
        (user.role === UserRoleEnum.Buyer && toDelete.client.id === user.id) ||
        user.role === UserRoleEnum.Admin
      ) {
        return await this.favorisRepository.delete(id);
      } else {
        throw new UnauthorizedException(`You can't delete this favoris`);
      }
    }
  }
}
