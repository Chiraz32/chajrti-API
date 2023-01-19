import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/';
import { addPlantDto } from './dto/addPlant.dto';
import { Plant } from './entity/plant.entity';
import { PlantService } from './plant.service';

@Controller('plant')
export class PlantController {
   constructor(private plantService: PlantService) { }

   @Get('all')
   async getAllPlants(): Promise<Plant[]> {
      return await this.plantService.getAllPlants();
   }

   @Get(':id')
   async getById(@Param('id') id: number) {
      return this.plantService.getById(id);
   }

   @Post('add')
   async addPlant(
      @Body() plant: addPlantDto,
      ) {
      await this.plantService.addPlant(plant);
   }

   @Patch('upload/:id')
   @UseInterceptors(FileInterceptor('file'))
   async uploadFile(
      @UploadedFile() file : Express.Multer.File,
      @Param('id') id :number
   ){
      console.log(file);
      const image = file.originalname;
      await this.plantService.addImage(id,image);
   }

   @Delete(':id')
   async deletePlant(@Param('id', ParseIntPipe) id: number) {
      return this.plantService.deletePlant(id);
   }
}
