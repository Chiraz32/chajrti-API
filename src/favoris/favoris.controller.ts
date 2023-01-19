import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { get } from 'http';
import { DeleteDateColumn } from 'typeorm';
import { addFavorisDto } from './dto/addFavoris.dto';
import { Favoris } from './entity/favoris.entity';
import { FavorisService } from './favoris.service';

@Controller('favoris')
export class FavorisController {
  constructor(private favorisService: FavorisService) {}

  @Get('all')
  async getFavorisByClient(): Promise<Favoris[]> {
    return await this.favorisService.getFavorisByClient();
  }

  @Post('add')
  async addFavoris(@Body() favoris: addFavorisDto): Promise<Favoris> {
    return await this.favorisService.addFavoris(favoris);
  }

  @Delete(':id')
  async deleteFavoris(@Param('id', ParseIntPipe) id: number) {
    return this.favorisService.deleteFavoris(id);
  }
}
