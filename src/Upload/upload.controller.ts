import { Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiResponse } from 'cloudinary';
import { AuthGuard } from 'src/Auth/auth.guard';


@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const upload = await this.uploadService.uploadImage(file);
        return { message: 'Image uploaded successfully', url: upload.secure_url };
    }

}