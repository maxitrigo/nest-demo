import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { UploadService } from "src/Upload/upload.service";
import { CategoriesService } from "src/Categories/categories.service";

@Injectable()
export class ProductsRepository {

    constructor(
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
        private readonly uploadService: UploadService,
        private readonly categoriesService: CategoriesService

    ) {}

    async getAll(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    async findAll(page: number, limit: number): Promise<Product[]> {
        const validPage = Math.max(Number(page) || 1, 1); // Convierte page a número, usa 1 si no es válido
        const validLimit = Math.max(Number(limit) || 10, 1); // Convierte limit a número, usa 10 si no es válido
    
        return await this.productsRepository.find({
            skip: (validPage - 1) * validLimit,
            take: validLimit,
        });
    }

    async findOne(id: string): Promise<Product> {
        return await this.productsRepository.findOne({ where: { id } });
    }

    async create(file: Express.Multer.File | null, ProductData) {
        let imgUrl: string | undefined;
        const newProduct = new Product();
        const category = await this.categoriesService.findOne({ where: { name: ProductData.category } });
        if (file) {
            const uploadImage = await this.uploadService.uploadImage(file);
            newProduct.imgUrl = uploadImage.secure_url;
        }
        newProduct.name = ProductData.name;
        newProduct.description = ProductData.description;
        newProduct.price = ProductData.price;
        newProduct.category = category;
        return await this.productsRepository.save(newProduct);
    }

    async updateImage(id: string, file: Express.Multer.File | null) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (file) {
            const uploadImage = await this.uploadService.uploadImage(file);
            product.imgUrl = uploadImage.secure_url;
        }
        return await this.productsRepository.save(product);
    }

    async update(searchValue: Partial<Product>, updateValue: Partial<Product>): Promise<Product> {  
        const product = await this.productsRepository.findOne({ where: searchValue });
        if (!product) {
            throw new Error('Product not found');
        }
        Object.assign(product, updateValue);
        return await this.productsRepository.save(product);
    }

    async delete(id: string) {
        return await this.productsRepository.delete(id);
    }
}