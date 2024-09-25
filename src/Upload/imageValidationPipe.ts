import { Injectable, PipeTransform, BadRequestException} from "@nestjs/common";

@Injectable()
export class ImageValidationPipe implements PipeTransform {
    constructor(
        private readonly maxSize: number, private readonly allowedTypes: string[]
    ) {}
    transform(file: Express.Multer.File) {
        if (file.size > this.maxSize) {
            throw new BadRequestException(`the file size is too large, the maximum size is ${this.maxSize} bytes`)
        }

        const fileType = file.mimetype.split('/')[1]
        if (!this.allowedTypes.includes(fileType)) {
            throw new BadRequestException(`the file type is not allowed, allowed types are ${this.allowedTypes.join(', ')}`)
        }
        return file
    }
}