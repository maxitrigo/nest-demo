import { IsEmail, IsString, Length, Matches, IsUUID } from 'class-validator';

export class CreateOrderDto {
    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, { message: 'Password too weak' })
    password: string;

    @IsUUID()
    productId: string; // Asegúrate de que este ID sea válido

    // Agrega más campos según sea necesario, validando cada uno como corresponde
}
