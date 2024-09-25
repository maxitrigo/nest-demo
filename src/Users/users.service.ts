import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { Users } from "./user.entity";
import { CreateUserDto } from "src/dtos/CreateUserDto";

@Injectable()
export class UsersService {
    constructor(
        private UsersRepository: UsersRepository
    ) {}
    
    getUsers() {
        return this.UsersRepository.findAll();
    }
    
    getUserById(id) {
        return this.UsersRepository.findById(id);
    }
    
    createUser(CreateUserDto: CreateUserDto) {
        return this.UsersRepository.createUser(CreateUserDto);
    }
    
    updateUser(id: string, body: Users) {
        return this.UsersRepository.updateUser(id, body);
    }
    
    deleteUser(id: string) {
        return this.UsersRepository.deleteUser(id);
    }

    findBySearchValue(searchValue) {
        return this.UsersRepository.findBySearchValue(searchValue);
    }
}