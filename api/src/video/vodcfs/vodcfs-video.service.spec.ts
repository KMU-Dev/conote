import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../../config/configuration';
import { PrismaModule } from '../../prisma/prisma.module';
import { VodcfsSessionService } from './vodcfs-session.service';
import { VodcfsVideoService } from './vodcfs-video.service';

describe('VodcfsVideoService', () => {
    let service: VodcfsVideoService;
    let sessionService: VodcfsSessionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule, ConfigModule.forRoot({ load: [configuration] }), PrismaModule],
            providers: [VodcfsVideoService, VodcfsSessionService],
        }).compile();

        service = module.get<VodcfsVideoService>(VodcfsVideoService);
        sessionService = module.get<VodcfsSessionService>(VodcfsSessionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    /* describe('getUploadUrl', () => {
        it('should not throw error', async () => {
            const sessionId = '6b5fcd70-5c8e-41ed-9c97-03836abff7dd';
            const session = await sessionService.findSessionById(sessionId);
            const cookie = sessionService.buildCookieFrom(session);

            const url = await service.getUploadUrl(cookie);
            console.log(url);
        });
    }); */
});
