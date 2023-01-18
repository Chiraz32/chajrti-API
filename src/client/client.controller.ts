import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { Body, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { Observable, of } from 'rxjs';
import { pathToFileURL } from 'url';
import { ClientService } from './client.service';
import { ClientInscritDto } from './dto/client-inscrit.dto';
import { ClientUpdateDto } from './dto/client-update.dto';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { Client } from './entity/client.entity';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import {v4 as uuidv4} from 'uuid';


const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`)
            
        }
    })
}

@Controller('client')
export class ClientController {
    constructor(
        private clientService: ClientService
    ){}

    @Post()
    inscrit(
        @Body() clientData: ClientInscritDto
    ): Promise<Partial<Client>>{
        return this.clientService.inscrit(clientData);
    }

    @Post('login')
    login(
        @Body() Credentials: LoginCredetialsDto
    ){
        return this.clientService.login(Credentials);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Body() clientData: ClientUpdateDto,
        @Param('id', ParseIntPipe) id : number
    ){
        return this.clientService.update(id,clientData);
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file',storage))
    uploadFile(@UploadedFile() file): Observable<Object>{
        console.log(file.filename);
        return of({imagePath: file.filename});
    }
}

