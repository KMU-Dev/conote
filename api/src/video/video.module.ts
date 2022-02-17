import { Module } from '@nestjs/common';
import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';
import { VodcfsModule } from './vodcfs/vodcfs.module';

@Module({
    imports: [VodcfsModule],
    providers: [VideoResolver, VideoService],
    exports: [VodcfsModule],
})
export class VideoModule {}
