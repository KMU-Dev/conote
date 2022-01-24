import { Module } from '@nestjs/common';
import { GoogleOAuth2Service } from './oauth2.service';

@Module({
    providers: [GoogleOAuth2Service],
    exports: [GoogleOAuth2Service],
})
export class GoogleModule {}
