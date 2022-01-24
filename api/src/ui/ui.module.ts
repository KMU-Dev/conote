import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UiResolver } from './ui.resolver';
import { UiService } from './ui.service';

@Module({
    imports: [UserModule],
    providers: [UiResolver, UiService],
})
export class UiModule {}
