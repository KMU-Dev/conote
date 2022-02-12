import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../../config/configuration';
import { PrismaModule } from '../../prisma/prisma.module';
import { VodcfsSessionService } from './vodcfs-session.service';

describe('VodcfsSessionService', () => {
    let service: VodcfsSessionService;

    jest.setTimeout(30 * 1000);

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

    describe('createVideoUploadSession', () => {
        it('should not throw error', async () => {
            await service.createVideoUploadSession(1);
        });
    });
});
