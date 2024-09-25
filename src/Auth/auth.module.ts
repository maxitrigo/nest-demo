import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersModule } from 'src/Users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService]
})
export class AuthModule {}