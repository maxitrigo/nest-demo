import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Orders } from "../Orders/orders.entity";

@Entity()
export class Users {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'varchar',  // Usa varchar en lugar de text para longitud
        length: 50,       // Longitud máxima para email
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',  // Usa varchar en lugar de text para longitud
        length: 50,       // Longitud máxima para nombre
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',  // Usa varchar en lugar de text para longitud
        length: 255,       // Longitud máxima para contraseña
        nullable: false,
    })
    password: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    isAdmin: boolean;
    
    @Column({
        type: 'text',
        nullable: true,  // Permite que sea opcional
    })
    address?: string;
    
    @Column({
        type: 'varchar',  // Usa varchar en lugar de int para teléfono
        length: 20,       // Longitud máxima para teléfono
        nullable: true,   // Permite que sea opcional
    })
    phone?: string;
    
    @Column({
        type: 'varchar',  // Usa varchar en lugar de text para longitud
        length: 50,       // Longitud máxima para país
        nullable: true,   // Permite que sea opcional
    })
    country?: string;
    
    @Column({
        type: 'varchar',  // Usa varchar en lugar de text para longitud
        length: 50,       // Longitud máxima para ciudad
        nullable: true,   // Permite que sea opcional
    })
    city?: string;

    @OneToMany(() => Orders, (orders) => orders.user)
    orders: Orders[];
}
