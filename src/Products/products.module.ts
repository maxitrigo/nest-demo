import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { UploadModule } from "src/Upload/upload.module";
import { CategoriesModule } from "src/Categories/categories.module";


@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, UploadModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
    exports: [ProductsService]
})
export class ProductsModule {}