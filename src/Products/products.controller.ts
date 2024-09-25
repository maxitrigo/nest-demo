import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthGuard } from "../Auth/auth.guard";
import { seedData } from "../helpers/seeder.seeder";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageValidationPipe } from "src/Upload/imageValidationPipe";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/Auth/roles.guard";
import { Role } from "src/Auth/roles.enum";

@Controller ('products')
export class ProductsController {
    constructor (
        private ProductService: ProductsService,

    ){}
    @Get()
    getProducts(@Query('page') page: 1, @Query('limit') limit: 5) {
        return this.ProductService.getProducts(page, limit)
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.ProductService.getProductById(id)
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image')) //intercepta el archivo de la imagen
    @UsePipes(new ImageValidationPipe(200 * 1024, ['jpeg','jpg', 'png']))
    createProduct(
        @UploadedFile() file: Express.Multer.File, //recibe el archivo de la imagen
        @Body() ProductData: Product //recibe el resto de los datos del producto
    ) {
        return this.ProductService.createProduct(file, ProductData)
    }

    @UseGuards(AuthGuard)
    @Put(':id/upload-image')
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new ImageValidationPipe(200 * 1024, ['jpeg','jpg', 'png']))
    updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        return this.ProductService.updateImage(id, file)
    }

    @Put(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id') id: string, @Body() ProductData: Partial<Product>) {
        return this.ProductService.updateProduct({id}, ProductData)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.ProductService.deleteProduct(id)
    }

    @UseGuards(AuthGuard)
    @Post('seeder')
    async seedProducts() {
        const data = seedData.products
        
        const existingData = await this.ProductService.getProductsSeed()

        const filteredData = data.filter(product => !existingData.some(existingProduct => existingProduct.name === product.name))
        filteredData.forEach(product => {
            this.ProductService.createProduct(null, product)
        })
        return (filteredData.length === 0) ? 'No new products to seed' : `Successfully seeded ${filteredData.map(product => product.name)}`
    }
}