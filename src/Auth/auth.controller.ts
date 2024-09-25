import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserCredentialsDto } from "src/dtos/UserCredentialsDto";
import { CreateUserDto } from "src/dtos/CreateUserDto";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "./roles.enum";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./roles.guard";

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    
    @Get()
    @UseGuards(AuthGuard)
    getAuth() {
        return 'this action returns authorized users';
    }

    @Get('admin')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    admin(){
        return 'this action returns admin users';
    }

    @Post('signup')
    createUser(@Body() CreateUserDto: CreateUserDto){
        return this.AuthService.signUp(CreateUserDto)
    }

    @Post('signin')
    signIn(@Body() user: UserCredentialsDto){
        return this.AuthService.signIn(user.email, user.password)
    }
}