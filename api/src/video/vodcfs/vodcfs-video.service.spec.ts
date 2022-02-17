import { Test, TestingModule } from '@nestjs/testing';
import { VodcfsVideoService } from './vodcfs-video.service';

describe('VodcfsVideoService', () => {
    let service: VodcfsVideoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VodcfsVideoService],
        }).compile();

        service = module.get<VodcfsVideoService>(VodcfsVideoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
