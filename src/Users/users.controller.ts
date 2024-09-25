import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "./user.entity";
import { AuthGuard } from "src/Auth/auth.guard";
import { CreateUserDto } from "src/dtos/CreateUserDto";
import { AuthService } from "src/Auth/auth.service";
import { UserCredentialsDto } from "src/dtos/UserCredentialsDto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/Auth/roles.enum";
import { RolesGuard } from "src/Auth/roles.guard";

@Controller('users')
export class UsersController{
    constructor(
        private readonly UsersService: UsersService,
        private readonly AuthService: AuthService
    ){}


    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(){
        return this.UsersService.getUsers()
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string){
        return this.UsersService.getUserById(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() body: Users){
        return this.UsersService.updateUser(id, body)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string){
        return this.UsersService.deleteUser(id)
    }
}