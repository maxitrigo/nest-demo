import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./CreateUserDto";

export class UserCredentialsDto extends PickType(CreateUserDto, ['email', 'password']) {}