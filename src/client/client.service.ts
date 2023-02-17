
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInscritDto } from './dto/client-inscrit.dto';
import { ClientUpdateDto } from './dto/client-update.dto';
import { Client } from './entity/client.entity';
import * as bcrypt from 'bcrypt'
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from 'src/enum/userRole.Enum';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        private jwtService: JwtService
    ) { }

    async getAll(user:Client): Promise<Client[]> {
        if(user.role === UserRoleEnum.Admin){
            return await this.clientRepository.find();
        }
        return await [user];
    }

    async getById(id: number, user : Client): Promise<Client> {
        
        if(user.role === UserRoleEnum.Admin || user.id == id){
            const client = await this.clientRepository.createQueryBuilder('client')
            .where('client.id = :id', { id }).getOne();
            if (!client) {
                throw new NotFoundException(`client ${id} n'existe pas`);
            }
            return client;
        }else{
            throw new UnauthorizedException(`You can't see this info`);
        }
    }

    async inscrit(clientData: ClientInscritDto): Promise<Partial<Client>> {
        const client = this.clientRepository.create({ ...clientData });
        client.salt = await bcrypt.genSalt();
        client.mdp = await bcrypt.hash(clientData.mdp, client.salt);
        try {
            await this.clientRepository.save(client);
        } catch (err) {
            throw new ConflictException(`l'email ${clientData.email} existe déjà`);
        }
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phoneNumber : client.phoneNumber
        };
    }

    async login(credentials: LoginCredetialsDto) {
        const { email, mdp } = credentials;
        const client = await this.clientRepository.createQueryBuilder('client')
            .where('client.email = :email', { email }).getOne();
        if (!client) {
            throw new NotFoundException(`email ${email} n'existe pas`);
        }
        const hashedMdp = await bcrypt.hash(mdp, client.salt);
        if (hashedMdp !== client.mdp) {
            throw new NotFoundException(`mdp incorrect`);
        } else {
            const payload = {
                id: client.id,
                name: client.name,
                email: client.email,
                image: client.image,
                phone:client.phoneNumber,
                role:client.role
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "accessToken": jwt
            }
        }
    }

    async update(id: number, clientData: ClientUpdateDto, user : Client): Promise<Partial<Client>> {
        if(user.role === UserRoleEnum.Admin || user.id == id){
            const newClient = await this.clientRepository.preload({
                id, ...clientData
            });
            if (!newClient) {
                throw new NotFoundException(`client ${id} n'existe pas`);
            }
            newClient.phoneNumber = clientData.phoneNumber;
            console.log(newClient);
            return await this.clientRepository.save(newClient);
        }else{
            throw new UnauthorizedException(`You can't update those infos`);
        }
        
    }

    async updateImage(id: number, image: string, user : Client) {
        if(user.role === UserRoleEnum.Admin || user.id == id){
            const newClient = await this.getById(id, user);
            newClient.image = image;
            return await this.clientRepository.save(newClient);
        }else{
            throw new UnauthorizedException(`You can't update this image`);
        }
    }

}
