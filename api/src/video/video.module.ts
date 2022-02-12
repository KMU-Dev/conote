import { Module } from '@nestjs/common';
import { VodcfsModule } from './vodcfs/vodcfs.module';

@Module({
    imports: [VodcfsModule],
    exports: [VodcfsModule],
})
export class VideoModule {}
