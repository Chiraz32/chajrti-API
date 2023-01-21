import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/';
import { Client } from 'src/client/entity/client.entity';
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
   @UseGuards(JwtAuthGuard)
   async getById(@Param('id', ParseIntPipe) id: number, @User() user) {
      return this.plantService.getById(id, user);
   }

   @Post('add')
   @UseGuards(JwtAuthGuard)
   async addPlant(
      @Body() plant: addPlantDto,
      @User() user
   ) {
      await this.plantService.addPlant(plant, user);
   }

   @Patch('upload/:id')
   @UseGuards(JwtAuthGuard)
   @UseInterceptors(FileInterceptor('file'))
   async uploadFile(
      @User() user:Client,
      @UploadedFile() file: Express.Multer.File,
      @Param('id', ParseIntPipe) id: number,
   
   ) {
      const newuser= user;
      console.log(newuser)
      const image = file.originalname;
      await this.plantService.addImage(id, image, newuser);
   }

   @Delete('delete/:id')
   @UseGuards(JwtAuthGuard)
   async deletePlant(@User() user,@Param('id', ParseIntPipe) id: number ) {
      console.log(user);

      return this.plantService.deletePlant(id, user);
   }
}
