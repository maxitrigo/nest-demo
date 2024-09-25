import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Users } from "../Users/user.entity";
import { OrderDetails } from "../OrderDetails/orderDetails.entity";

@Entity()
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @ManyToOne(() => Users, (user) => user.orders)
    user: Users;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date;

    @OneToOne(() => OrderDetails )
    @JoinColumn()
    orderDetails: OrderDetails;
}