import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { userInfo } from 'os';
import { User } from 'src/decorators/client.decorator';
import { ClientService } from './client.service';
import { ClientInscritDto } from './dto/client-inscrit.dto';
import { ClientUpdateDto } from './dto/client-update.dto';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { Client } from './entity/client.entity';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@User() client): Promise<Client[]> {
    return await this.clientService.getAll(client);
  }

  @Post('inscrit')
  async inscrit(
    @Body() clientData: ClientInscritDto,
  ): Promise<Partial<Client>> {
    return await this.clientService.inscrit(clientData);
  }

  @Post('login')
  async login(@Body() Credentials: LoginCredetialsDto) {
    return await this.clientService.login(Credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Body() clientData: ClientUpdateDto,
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.clientService.update(id, clientData, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(file);
    const image = file.originalname;
    return await this.clientService.updateImage(id, image, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@User() user, @Param('id', ParseIntPipe) id: number) {
    return await this.clientService.getById(id, user);
  }
}
