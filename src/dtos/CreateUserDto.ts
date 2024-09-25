import { IsString, IsEmail, IsNotEmpty, Length, Matches, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, { message: 'Password too weak' })
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isAdmin: boolean;

    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    city: string;
}
