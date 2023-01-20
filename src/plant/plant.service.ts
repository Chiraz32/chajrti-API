import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entity/client.entity';
import { Repository } from 'typeorm';
import { addPlantDto } from './dto/addPlant.dto';
import { Plant } from './entity/plant.entity';

@Injectable()
export class PlantService {
constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>){}

async getAllPlantsbySeller(user:Client ):Promise<Plant[]>{
    return await this.plantRepository.find(
        {
            where:{client:user}
        }
    );
}
async getAllPlants( ):Promise<Plant[]>{
    return await this.plantRepository.find()  ;
}

async getById(id : number){
    const plant = this.plantRepository.findOne(
        {where:{id :id}}
    );
    if (plant)
        return plant;
    throw new NotFoundException();
}


async addPlant(plant: addPlantDto):Promise<Plant> {
    const newPlant = this.plantRepository.create(plant);
    return await this.plantRepository.save(newPlant);
  }

async addImage(id : number , image:string):Promise<Plant> {
    const newPlant = await this.getById(id);
    newPlant.image = image;
    return await this.plantRepository.save(newPlant);
}

async deletePlant(id : number){
    return await this.plantRepository.delete(id);
}

}
