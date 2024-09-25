import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";


@Injectable()
export class CategoriesService {

    constructor( private CategoriesRepository: CategoriesRepository) {}
    
    getCategories() {
        return this.CategoriesRepository.getCategories()
    }
    
    addCategory(body) {
        return this.CategoriesRepository.addCategory(body)
    }

    findOne(name) {
        return this.CategoriesRepository.findOne(name)
    }

}