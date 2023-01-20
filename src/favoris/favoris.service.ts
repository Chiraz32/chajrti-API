import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entity/client.entity';
import { PlantService } from 'src/plant/plant.service';
import { Repository } from 'typeorm';
import { addFavorisDto } from './dto/addFavoris.dto';
import { Favoris } from './entity/favoris.entity';

@Injectable()
export class FavorisService {
  constructor(
    @InjectRepository(Favoris)
    private favorisRepository: Repository<Favoris>,
  ) {}

  async getFavorisByClient(user : Client): Promise<Favoris[]> {
    return await this.favorisRepository.find({
      where:{client:user},
      relations: {
        plant: true,
        client: true,
      },
    });
  }

  async addFavoris(favoris: addFavorisDto): Promise<Favoris> {
    const newFavoris = this.favorisRepository.create(favoris);
    await this.favorisRepository.save(newFavoris);
    return newFavoris;
  }

  async deleteFavoris(id: number) {
    return await this.favorisRepository.delete(id);
  }
}
