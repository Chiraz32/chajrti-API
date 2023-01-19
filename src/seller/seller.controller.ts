import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { Body, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { SellerService } from './seller.service';
import { SellerInscritDto } from './dto/seller-inscrit.dto';
import { SellerUpdateDto } from './dto/seller-update.dto';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { Seller } from './entity/seller.entity';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('seller')
export class SellerController {

    // constructor(
    //     private sellerService: SellerService
    // ) { }

    // @Get('getAll')
    // getAll(): Promise<Seller[]> {
    //     return this.sellerService.getAll();
    // }

    // @Post('inscrit')
    // inscrit(
    //     @Body() sellerData: SellerInscritDto
    // ): Promise<Partial<Seller>> {
    //     return this.sellerService.inscrit(sellerData);
    // }

    // @Post('login')
    // login(
    //     @Body() Credentials: LoginCredetialsDto
    // ) {
    //     return this.sellerService.login(Credentials);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Patch('update/:id')
    // update(
    //     @Body() sellerData: SellerUpdateDto,
    //     @Param('id', ParseIntPipe) id: number
    // ) {
    //     return this.sellerService.update(id, sellerData);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Post('upload/:id')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadFile(
    //     @UploadedFile() file: Express.Multer.File,
    //     @Param('id', ParseIntPipe) id: number
    // ) {
    //     console.log(file);
    //     const image = file.originalname;
    //     return await this.sellerService.updateImage(id, image);
    // }
}
