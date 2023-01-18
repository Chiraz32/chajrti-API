import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { Body, Param, Patch, Post, UploadedFile, UseGuards} from '@nestjs/common/decorators';
import { Observable} from 'rxjs';
import { SellerService } from './seller.service';
import { SellerInscritDto } from './dto/seller-inscrit.dto';
import { SellerUpdateDto } from './dto/seller-update.dto';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { Seller } from './entity/seller.entity';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';

@Controller('seller')
export class SellerController {
    constructor(
        private sellerService: SellerService
    ){}

    @Post('inscrit')
    inscrit(
        @Body() sellerData: SellerInscritDto
    ): Promise<Partial<Seller>>{
        return this.sellerService.inscrit(sellerData);
    }

    @Post('login')
    login(
        @Body() Credentials: LoginCredetialsDto
    ){
        return this.sellerService.login(Credentials);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    update(
        @Body() sellerData: SellerUpdateDto,
        @Param('id', ParseIntPipe) id : number
    ){
        return this.sellerService.update(id,sellerData);
    }

    //virsion 1
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
        @Body() sellerData: SellerUpdateDto,
        @Param('id', ParseIntPipe) id : number
    ){
        console.log(file.filename);
        return this.sellerService.updateImage(id,sellerData,file);
    }
}
