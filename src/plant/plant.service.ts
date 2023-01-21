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

@Injectable()
export class PlantService {
    constructor(
        @InjectRepository(Plant)
        private plantRepository: Repository<Plant>) { }
    private
    // async getAllPlantsbySeller(user: Client): Promise<Plant[]> {
    //     return await this.plantRepository.find(
    //         {
    //             where: { client: user }

    //         }
    //     )
    //         ;
    // }
    async getAllPlants(user: Client): Promise<Plant[]> {
        if (user.role === UserRoleEnum.Buyer || user.role === UserRoleEnum.Admin) { return await this.plantRepository.find(); }
        else {
            return await this.plantRepository.find(
                {
                    where: { client: user }
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
        if (user.role === UserRoleEnum.Admin || user.role === UserRoleEnum.Buyer || (user.role === UserRoleEnum.Seller && (await plant).client.id === user.id)) { return plant; }
        else {
            throw new UnauthorizedException();
        }

    }

    async addPlant(plant: addPlantDto, user: Client): Promise<Plant> {
        plant.client = user;
        if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Seller && user.id === plant.client.id)) {
            const newPlant = this.plantRepository.create(plant);
            return await this.plantRepository.save(newPlant);
        }
        else {
            throw new UnauthorizedException();
        }
    }

    async addImage(id: number, image: string, user: Client): Promise<Plant> {
        const newPlant = await this.getById(id, user);
        if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Seller && newPlant.client.id === user.id)) {
            newPlant.image = image;
            return await this.plantRepository.save(newPlant);
        }
        else {
            throw new UnauthorizedException();
        }
    }

    async deletePlant(id: number, user: Client) {
        const toDelete = await this.plantRepository.findOne({
            where: { id: id }, relations: {
                client: true,
            }
        });
        if (!toDelete) {
            throw new NotFoundException(`This plant doesn't exist`);
        } else if (user.role === UserRoleEnum.Admin || (user.role === UserRoleEnum.Seller && (toDelete.client.id === user.id))) {
            return await this.plantRepository.delete(id);
        } else {
            throw new UnauthorizedException();
        }

    }
}
