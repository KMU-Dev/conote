import { Module } from '@nestjs/common';
import { GoogleModule } from '../google/google.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [GoogleModule],
    providers: [AuthResolver, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
