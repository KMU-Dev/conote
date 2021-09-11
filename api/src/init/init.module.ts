import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { InitResolver } from './init.resolver';
import { GoogleModule } from '../google/google.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [GoogleModule, UserModule, AuthModule],
    providers: [InitService, InitResolver],
})
export class InitModule {}
