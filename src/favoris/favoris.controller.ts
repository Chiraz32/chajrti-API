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
import { JwtAuthGuard } from 'src/client/Guards/jwt-auth.guard';
import { User } from 'src/decorators/client.decorator';
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
  async addFavoris(
    @Body() favoris: addFavorisDto,
    @User() user,
  ): Promise<Favoris> {
    return await this.favorisService.addFavoris(favoris, user);
  }

  @Delete(':id')
  async deleteFavoris(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ) {
    return this.favorisService.deleteFavoris(id, user);
  }
}
