import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../../config/configuration';
import { PrismaModule } from '../../prisma/prisma.module';
import { VodcfsSessionService } from './vodcfs-session.service';

describe('VodcfsSessionService', () => {
    let service: VodcfsSessionService;

    jest.setTimeout(60 * 1000);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ load: [configuration] }),
                HttpModule.register({ withCredentials: true }),
                PrismaModule,
            ],
            providers: [VodcfsSessionService],
        }).compile();

        service = module.get<VodcfsSessionService>(VodcfsSessionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    /* describe('createSession', () => {
        it('should not throw error', async () => {
            await service.createSession(1);
        });
    }); */

    describe('authenticateSession', () => {
        it('should not throw error', async () => {
            await service.authenticateSession('497109cf-f017-45ad-b25e-bc77b20740b7', 'heLd');
        });
    });
});
