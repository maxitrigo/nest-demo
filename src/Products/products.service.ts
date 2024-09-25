import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.entity";

@Injectable()
export class ProductsService {
    constructor(
        private ProductsRepository: ProductsRepository
    ) {}
    
    getProductsSeed() {
        return this.ProductsRepository.getAll()
    }

    getProducts(page:number, limit:number) {
        return this.ProductsRepository.findAll(page, limit);
    }
    
    getProductById(id: string) {
        return this.ProductsRepository.findOne(id);
    }

    async createProduct(file: Express.Multer.File | null, ProductData) {
        return await this.ProductsRepository.create(file, ProductData);
    }

    updateImage(id: string, file: Express.Multer.File | null) {
        return this.ProductsRepository.updateImage(id, file);
    }

    updateProduct(searchValue: Partial<Product>, updateValue: Partial<Product>): Promise<Product> {
        return this.ProductsRepository.update(searchValue, updateValue);
    }

    deleteProduct(id: string) {
        return this.ProductsRepository.delete(id);
    }
}