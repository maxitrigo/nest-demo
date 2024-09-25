import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/CreateUserDto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>
    ) {}

    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async findById(id) {
        const user = await this.usersRepository.findOne({ where: { id }, relations: ['orders'] });
        return user
    }

    async findBySearchValue(searchValue) {
        const user = await this.usersRepository.findOne({ where: searchValue });
        return user
    }

    async createUser(CreateUserDto: CreateUserDto) {
        return await this.usersRepository.save(CreateUserDto);
    }

    async updateUser(id: string, body: Users) {
        return await this.usersRepository.update(id, body);
    }

    async deleteUser(id: string) {
        return await this.usersRepository.delete(id);
    }
}