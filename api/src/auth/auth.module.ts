import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    providers: [AuthResolver, AuthService],
    exports: [AuthResolver],
})
export class AuthModule {}
