import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/dtos/CreateOrderDto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository
    ) {}
    
    addOrder(CreateOrderDto: CreateOrderDto) {
        return this.ordersRepository.addOrder(CreateOrderDto);
    }

    getOrders(id) {
        return this.ordersRepository.getOrders(id);
    }

    getAllOrders() {
        return this.ordersRepository.getAllOrders();
    }

}