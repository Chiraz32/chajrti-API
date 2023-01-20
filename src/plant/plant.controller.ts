import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/';
import { JwtAuthGuard } from 'src/client/Guards/jwt-auth.guard';
import { User } from 'src/decorators/client.decorator';
import { addPlantDto } from './dto/addPlant.dto';
import { Plant } from './entity/plant.entity';
import { PlantService } from './plant.service';

@Controller('plant')
export class PlantController {
   constructor(private plantService: PlantService) { }

   // @Get('seller')
   // @UseGuards(JwtAuthGuard)
   // async getAllPlantsBySeller(@User() user): Promise<Plant[]> {
   //    return await this.plantService.getAllPlantsbySeller(user);
   // }

   @Get('all')
   @UseGuards(JwtAuthGuard)
   async getAllPlants(@User() user): Promise<Plant[]> {
      return await this.plantService.getAllPlants(user);
   }

   @Get(':id')
   async getById(@Param('id') id: number, @User() user) {
      return this.plantService.getById(id, user);
   }

   @Post('add')
   async addPlant(
      @Body() plant: addPlantDto,
      @User() user
   ) {
      await this.plantService.addPlant(plant, user);
   }

   @Patch('upload/:id')
   @UseInterceptors(FileInterceptor('file'))
   async uploadFile(
      @UploadedFile() file: Express.Multer.File,
      @Param('id') id: number,
      @User() user
   ) {
      console.log(file);
      const image = file.originalname;
      await this.plantService.addImage(id, image, user);
   }

   @Delete(':id')
   async deletePlant(@Param('id', ParseIntPipe) id: number, @User() user) {
      return this.plantService.deletePlant(id, user);
   }
}
