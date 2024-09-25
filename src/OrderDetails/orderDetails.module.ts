import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { OrderDetailsService } from "./orderDetails.service";
import { OrderDetailsRepository } from "./orderDetails.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetails])],
    providers: [OrderDetailsService, OrderDetailsRepository],
    exports: [OrderDetailsService]
})
export class OrderDetailsModule {}
