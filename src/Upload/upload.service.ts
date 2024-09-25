import { Injectable } from '@nestjs/common';
import { UploadRepository } from './upload.repository';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
    constructor(private readonly uploadRepository: UploadRepository) {}

    async uploadImage(file: Express.Multer.File) {
        return await this.uploadRepository.uploadImage(file);
    }
}