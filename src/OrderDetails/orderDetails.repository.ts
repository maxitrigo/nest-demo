import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrderDetailsRepository {

    constructor(
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>
    ) {}

    async addOrderDetails(body) {
        return this.orderDetailsRepository.save(body);
    }

    async findOne(arg0: { where: { id: string; }; relations: string[]; }) {
        return this.orderDetailsRepository.findOne(arg0);
    }
}
