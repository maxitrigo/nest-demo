import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Categories } from "./categories.entity";
import { seedData } from "../helpers/seeder.seeder";

@Controller('categories')
export class CategoriesController {
    constructor(
        private CategoriesService: CategoriesService,
    ) {}

    @Get()
    getCategories(){
        return this.CategoriesService.getCategories()
    }

    @Post()
    addCategory(@Body() body: Categories){
        return this.CategoriesService.addCategory(body)
    }

    @Post('seeder')
    async seedCategories(){
        const data = seedData.categories
        const existingData = await this.CategoriesService.getCategories()
        const filteredData = data.filter(category => !existingData.some(existingCategory => existingCategory.name === category.name))
        filteredData.forEach(category => {
            this.CategoriesService.addCategory(category)
        })
        return (filteredData.length === 0) ? 'No new categories to seed' : `Successfully seeded ${filteredData.map(product => product.name)}`
    }

}