import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { get } from 'http';
import { JwtAuthGuard } from 'src/client/Guards/jwt-auth.guard';
import { User } from 'src/decorators/client.decorator';
import { DeleteDateColumn } from 'typeorm';
import { addFavorisDto } from './dto/addFavoris.dto';
import { Favoris } from './entity/favoris.entity';
import { FavorisService } from './favoris.service';

@Controller('favoris')
export class FavorisController {
  constructor(private favorisService: FavorisService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getFavorisByClient( @User() user): Promise<Favoris[]> {
    return await this.favorisService.getFavorisByClient(user);
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
