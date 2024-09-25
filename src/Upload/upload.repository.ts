import { Injectable } from '@nestjs/common';
import { bufferToStream } from 'buffer-to-stream';
import { UploadApiResponse, v2 } from 'cloudinary';


@Injectable()
export class UploadRepository {
    constructor() {}
    
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        return reject(new Error(`Error uploading image: ${error.message}`));
                    }
                    resolve(result);
                }
            );

            bufferToStream(file.buffer).pipe(upload);
            
        })

    }
}