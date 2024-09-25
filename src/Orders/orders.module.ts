import { Module } from '@nestjs/common';
import { ordersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { OrderDetails } from 'src/OrderDetails/orderDetails.entity';
import { UsersModule } from 'src/Users/users.module';
import { ProductsModule } from 'src/Products/products.module';
import { OrderDetailsModule } from 'src/OrderDetails/orderDetails.module';

@Module({
    imports: [TypeOrmModule.forFeature([Orders]), UsersModule, ProductsModule, OrderDetailsModule],
    controllers: [ordersController],
    providers: [OrdersRepository, OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {};