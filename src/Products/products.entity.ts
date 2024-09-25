import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { OrderDetails } from "src/OrderDetails/orderDetails.entity";
import { Categories } from "src/Categories/categories.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
      type: 'varchar',
      length: 50,
      nullable: false,
    })
    name: string;

    @Column({
      type: 'text',
      nullable: false,
    })
    description: string;
    
    @Column({
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    })
    price: number;
    
    @Column({
      type: 'int',
      nullable: false,
    })
    stock: number;
    
    @Column({
      type: 'text',
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    })
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    category: Categories    


  }