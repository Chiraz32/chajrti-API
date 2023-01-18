import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { Body, Param, Patch, Post, UploadedFile, UseGuards} from '@nestjs/common/decorators';
import { Observable} from 'rxjs';
import { ClientService } from './client.service';
import { ClientInscritDto } from './dto/client-inscrit.dto';
import { ClientUpdateDto } from './dto/client-update.dto';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { Client } from './entity/client.entity';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';


@Controller('client')
export class ClientController {
    constructor(
        private clientService: ClientService
    ){}

    @Post('inscrit')
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

    // @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    update(
        @Body() clientData: ClientUpdateDto,
        @Param('id', ParseIntPipe) id : number
    ){
        return this.clientService.update(id,clientData);
    }

    // version 1
    // @UseGuards(JwtAuthGuard)
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file',storage))
    // uploadFile(@UploadedFile() file): Observable<Object>{
    //     console.log(file.filename);
    //     return of({imagePath: file.filename});
    // }

    // my version
    @Patch('upload/:id')
    uploadFile(
        @UploadedFile() file,
        @Body() clientData: ClientUpdateDto,
        @Param('id', ParseIntPipe) id : number
    ){
        console.log(file.filename);
        return this.clientService.updateImage(id,clientData,file);
    }
}

