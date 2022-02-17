import { Injectable } from '@nestjs/common';
import { User, VideoUploadService } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UploadVodcfsVideoInput } from './models/upload-vodcfs-video.model';
import { VodcfsVideoService } from './vodcfs/vodcfs-video.service';

@Injectable()
export class VideoService {
    constructor(private readonly prisma: PrismaService, private readonly vodcfsUploadService: VodcfsVideoService) {}

    async uploadVideo(vodcfsInput: UploadVodcfsVideoInput, user: User) {
        let video = await this.prisma.video.create({
            data: {
                title: vodcfsInput.title,
                uploadService: VideoUploadService.VODCFS,
                user: { connect: { id: user.id } },
            },
        });

        const vodcfsVideo = await this.vodcfsUploadService.uploadVideo(
            video.id,
            vodcfsInput.title,
            vodcfsInput.file,
            vodcfsInput.sessionId,
        );
        video = await this.prisma.video.update({
            where: { id: video.id },
            data: { duration: vodcfsVideo.duration },
        });

        return video;
    }
}
