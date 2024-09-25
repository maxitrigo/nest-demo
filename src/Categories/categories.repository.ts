import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>
    ) {}
    
    async getCategories(): Promise<Categories[]> {
        return await this.categoriesRepository.find();
    }
    
    async addCategory(body) {
        return await this.categoriesRepository.save(body);
    }
    
    async findOne(name) {
        return await this.categoriesRepository.findOne({ where: { name } });
    }
}