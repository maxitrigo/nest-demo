import { Body, Controller, Get, Param, Post, UseGuards, } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('orders')
export class ordersController {
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() body) {
        return this.ordersService.addOrder(body);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getOrders(@Param('id') id: string) {
        return this.ordersService.getOrders(id);
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }

}