import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VodcfsSessionResolver } from './vodcfs-session.resolver';
import { VodcfsSessionService } from './vodcfs-session.service';

@Module({
    imports: [HttpModule],
    providers: [VodcfsSessionResolver, VodcfsSessionService],
})
export class VodcfsModule {}
