import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/CreateUserDto";
import { UsersService } from "src/Users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";

@Injectable()
export class AuthService {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signUp(userData: CreateUserDto) {
        const user = await this.usersService.findBySearchValue({ email: userData.email});
        if (user) {
            throw new ConflictException(`El usuario con el email: ${user.email} ya existe`);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        if (!hashedPassword) {
            throw new InternalServerErrorException('Error al crear el usuario');
        }
        
        await this.usersService.createUser({...userData, password: hashedPassword});
        const updatedUser = await this.usersService.findBySearchValue({ email: userData.email });

        if (!updatedUser) {
            throw new NotFoundException('Usuario no encontrado después de la creación');
        }
        
        return {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                address: updatedUser.address,
                phone: updatedUser.phone,
                country: updatedUser.country,
                city: updatedUser.city            
        }
    }


    async signIn(email: string, password: string) {
        const user = await this.usersService.findBySearchValue({ email: email });
        if (!user) {
            throw new NotFoundException('El usuario no existe');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new ConflictException('El email o la contraseña son incorrectos');
        }

        const payload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            roles: user.isAdmin ? [Role.ADMIN] : [Role.USER]
        };
        const token = this.jwtService.sign(payload);

        return { message: 'Usuario logueado correctamente', token };

    }
    

}