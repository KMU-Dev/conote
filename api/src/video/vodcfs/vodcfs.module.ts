import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VodcfsSessionService } from './vodcfs-session.service';

@Module({
    imports: [HttpModule],
    providers: [VodcfsSessionService],
})
export class VodcfsModule {}
