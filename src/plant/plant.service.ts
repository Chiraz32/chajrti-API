import { Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Client } from 'src/client/entity/client.entity';
import { UserRoleEnum } from 'src/enum/userRole.Enum';
import { Repository } from 'typeorm';
import { addPlantDto } from './dto/addPlant.dto';
import { Plant } from './entity/plant.entity';
import { ClientService } from "../client/client.service"
import { PlantUpdateDto } from './dto/plant.update';

@Injectable()
export class PlantService {
    constructor(
        @InjectRepository(Plant)
        private plantRepository: Repository<Plant>) { }
   
    async getAllPlants(user): Promise<Plant[]> {
        if (user.role === UserRoleEnum.Buyer || user.role === UserRoleEnum.Admin) 
        { return await this.plantRepository.find({relations: {
            client: true,
        }}); }
        else {
            return await this.plantRepository.find(
                {
                   where: { 
                     client: user 
                  },
                   relations: {
                    client: true,
                }
                }
            );
        }
    }
  
    async getById(id: number, user: Client) {
        const plant = this.plantRepository.findOne(
            {
                where: { id: id, }, relations: {
                    client: true,
                }
            }
        );
        console.log(await (plant));
        if (!plant)
            throw new NotFoundException();
        if (user.role === UserRoleEnum.Admin || user.role === UserRoleEnum.Buyer ||
             (user.role === UserRoleEnum.Seller && (await plant).client.id === user.id)) 
        { return plant; }
        else {
            throw new UnauthorizedException();
        }

    }

    async addPlant(plant: addPlantDto, user): Promise<Plant> {
        if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Seller)) {

            const newPlant = this.plantRepository.create(plant);
            if (user.role === UserRoleEnum.Seller) newPlant.client=user;

            return await this.plantRepository.save(newPlant);
        }
        else {
            throw new UnauthorizedException();
        }
    }

    async addImage(id: number, image: string, user): Promise<Plant> {
        console.log("thisid "+ id);
        console.log("thisUser "+ user);
        const newPlant = await this.plantRepository.findOne({where:{id:id}});
        console.log(newPlant);
        const client = newPlant.client;
        if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Seller 
            && client.id === user.id)) {
            newPlant.image = image;
            return await this.plantRepository.save(newPlant);
        }
        else {
            throw new UnauthorizedException();
        }
    }

    async update(id: number, plant: PlantUpdateDto, user : Client): Promise<Partial<Client>> {
        if(user.role === UserRoleEnum.Admin || user.id == id){
            console.log(plant)
            const newPlant = await this.plantRepository.preload({
                id, ...plant
            })
            if (!newPlant) {
                throw new NotFoundException(`plante ${id} n'existe pas`);
            }
            console.log(newPlant);
            return await this.plantRepository.save(newPlant);
        }else{
            throw new UnauthorizedException(`You can't update those infos`)
        }
        
    }

    async deletePlant(id: number, user) {
        console.log("this is user " +user)
        const toDelete = await this.plantRepository.findOne({
            where: { id: id }, relations: {
                client: true,
            }
        });
        const client =toDelete.client;
        if (!toDelete) {
            throw new NotFoundException(`This plant doesn't exist`);
        } else if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Seller && (client.id === user.id))) {
            return await this.plantRepository.delete(id);
        } else {
            throw new UnauthorizedException();
        }

    }
}
