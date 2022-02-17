import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VodcfsSessionResolver } from './vodcfs-session.resolver';
import { VodcfsSessionService } from './vodcfs-session.service';
import { VodcfsVideoService } from './vodcfs-video.service';

@Module({
    imports: [HttpModule],
    providers: [VodcfsSessionResolver, VodcfsSessionService, VodcfsVideoService],
    exports: [VodcfsVideoService],
})
export class VodcfsModule {}
