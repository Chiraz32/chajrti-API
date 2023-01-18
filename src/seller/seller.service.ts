import { ConflictException, Injectable, NotFoundException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import path from 'path';
import { Repository } from 'typeorm';
import { Seller } from './entity/seller.entity';
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcrypt';
import { SellerInscritDto } from './dto/seller-inscrit.dto';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { SellerUpdateDto } from './dto/seller-update.dto';


@Injectable()
export class SellerService {
    constructor(
        @InjectRepository(Seller)
        private sellerRepository : Repository<Seller>,
        private jwtService: JwtService
    ){}

    async inscrit(sellerData: SellerInscritDto) : Promise<Partial<Seller>>{
        const seller = this.sellerRepository.create({...sellerData});
        seller.salt = await bcrypt.genSalt();
        seller.mdp = await bcrypt.hash(sellerData.mdp, seller.salt);
        try{
            await this.sellerRepository.save(seller);
        }catch(err){
            throw new ConflictException(`l'email ${sellerData.email} existe déjà`);
        }
        return {
            id: seller.id,
            surname: seller.surname,
            email: seller.email
        };
    }

    async login(credentials: LoginCredetialsDto){
        const {email, mdp} = credentials;
        const seller = await this.sellerRepository.createQueryBuilder('seller')
            .where('seller.email = :email', {email}).getOne();
        if(!seller){
            throw new NotFoundException(`email ${email} n'existe pas`);
        }
        const hashedMdp = await bcrypt.hash(mdp, seller.salt);
        if(hashedMdp !== seller.mdp){
            throw new NotFoundException(`mdp incorrect`);
        }else{
            const payload = {
                id: seller.id,
                surname: seller.surname,
                email: seller.email
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "accessToken": jwt
            }
            
        }
    }

    async update(id : number, sellerSata: SellerUpdateDto) : Promise<Partial<Seller>>{
        const newSeller = await this.sellerRepository.preload({
            id, ...sellerSata
        })
        if(!newSeller){
            throw new NotFoundException(`seller ${id} n'existe pas`);
        }
        return await this.sellerRepository.save(newSeller);
    }
    
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './uploads/profileimages',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                const extension: string = path.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`)
                
            }
        })
    }))
    async updateImage(id: number, sellerData: SellerUpdateDto, @UploadedFile() file) : Promise<Partial<Seller>>{
        const newSeller = await this.sellerRepository.preload({id, ...sellerData});
        if(!newSeller){
            throw new NotFoundException(`seller ${id} n'existe pas`);
        }
        sellerData.image = file.filename;
        return await this.sellerRepository.save(newSeller);
    }
}
