
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInscritDto } from './dto/client-inscrit.dto';
import { ClientUpdateDto } from './dto/client-update.dto';
import { Client } from './entity/client.entity';
import * as bcrypt from 'bcrypt'
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        private jwtService: JwtService
    ) { }

    async getAll(): Promise<Client[]> {
        return await this.clientRepository.find();
    }

    async getById(id: number): Promise<Client> {
        const client = await this.clientRepository.createQueryBuilder('client')
            .where('client.id = :id', { id }).getOne();
        if (!client) {
            throw new NotFoundException(`client ${id} n'existe pas`);
        }
        return client;
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
            email: client.email
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
                email: client.email
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "accessToken": jwt
            }
        }
    }

    async update(id: number, clientData: ClientUpdateDto): Promise<Partial<Client>> {
        const newClient = await this.clientRepository.preload({
            id, ...clientData
        })
        if (!newClient) {
            throw new NotFoundException(`client ${id} n'existe pas`);
        }
        return await this.clientRepository.save(newClient);
    }

    async updateImage(id: number, image: string) {
        const newClient = await this.getById(id);
        newClient.image = image;
        return await this.clientRepository.save(newClient);
    }

}
