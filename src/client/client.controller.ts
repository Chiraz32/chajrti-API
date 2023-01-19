import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { Body, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
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
    ) { }

    @Get('getAll')
    getAll(): Promise<Client[]> {
        return this.clientService.getAll();
    }

    @Post('inscrit')
    inscrit(
        @Body() clientData: ClientInscritDto
    ): Promise<Partial<Client>> {
        return this.clientService.inscrit(clientData);
    }

    @Post('login')
    login(
        @Body() Credentials: LoginCredetialsDto
    ) {
        return this.clientService.login(Credentials);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    update(
        @Body() clientData: ClientUpdateDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.clientService.update(id, clientData);
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number
    ) {
        console.log(file);
        const image = file.originalname;
        return await this.clientService.updateImage(id, image);
    }

}

