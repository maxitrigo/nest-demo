import { Injectable } from "@nestjs/common";
import { OrderDetailsRepository } from "./orderDetails.repository";

@Injectable()
export class OrderDetailsService {
    
    constructor(
        private OrderDetailsRepository: OrderDetailsRepository
    ) {}
    
    addOrderDetails(body) {
        return this.OrderDetailsRepository.addOrderDetails(body);
    }
    
    findOne(arg0: { where: { id: string; }; relations: string[]; }) {
        return this.OrderDetailsRepository.findOne(arg0);
    }
}
