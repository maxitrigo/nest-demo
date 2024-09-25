import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './orders.entity';
import { OrderDetails } from 'src/OrderDetails/orderDetails.entity';
import { UsersService } from 'src/Users/users.service';
import { ProductsService } from 'src/Products/products.service';
import { OrderDetailsService } from 'src/OrderDetails/orderDetails.service';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        private readonly UsersService: UsersService,
        private readonly ProductsService: ProductsService,
        private readonly OrderDetailsService: OrderDetailsService
    ) {}

    async addOrder(body) {
        try {
            const user = await this.UsersService.getUserById(body.userId);
            if (!user) throw new Error('User not found');
    
            const order = new Orders();
            order.user = user;
    
            let orderTotal = 0;
            const productsIds = body.products;
    
            const productsPromise = productsIds.map(async (product) => {
                const result = await this.ProductsService.getProductById(product.id);
                if (!result) throw new Error(`Product with ID ${product.id} not found`);
                if (result.stock === 0) throw new Error('Product out of stock');
    
                orderTotal += Number(result.price);
                result.stock -= 1;
    
                await this.ProductsService.updateProduct({id: result.id}, { stock: result.stock });
                return result;
            });
    
            const productsArray = await Promise.all(productsPromise);
    
            const orderDetails = new OrderDetails();
            order.orderDetails = orderDetails;
            orderDetails.products = productsArray;
            orderDetails.price = orderTotal;
    
            await this.OrderDetailsService.addOrderDetails(orderDetails);
            await this.ordersRepository.save(order);
        } catch (error) {
            throw new Error('Failed to create order');
        }
    }
    

    async getOrders(id: string) {
        const order = await this.ordersRepository.findOne({where: {id: id}, relations: ['orderDetails'] });
        const orderDetails = order.orderDetails.id;
        const details = await this.OrderDetailsService.findOne({where: {id: orderDetails}, relations: ['products'] });
        return {
            order: {
                id: order.id,
                date: order.date,
                orderDetails: {
                    id: details.id,
                    price: details.price,
                    products: details.products
                }
            }
        };               
    }

    async getAllOrders() {
        return this.ordersRepository.find();
    }
    
}