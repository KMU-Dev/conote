import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Domain } from '../casl/decorators/domain.decorator';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { UploadVodcfsVideoInput } from './models/upload-vodcfs-video.model';
import { VideoModel } from './models/video.model';
import { VideoService } from './video.service';
import { VodcfsVideoService } from './vodcfs/vodcfs-video.service';

@Domain('Video')
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Resolver(() => VideoModel)
export class VideoResolver {
    constructor(private readonly videoService: VideoService, private readonly vodcfsVideoService: VodcfsVideoService) {}

    @Mutation(() => VideoModel)
    async uploadVideo(@Args('vodcfsInput') vodcfsInput: UploadVodcfsVideoInput, @CurrentUser() user: User) {
        return await this.videoService.uploadVideo(vodcfsInput, user);
    }

    @ResolveField()
    async vodcfsVideo(@Parent() video: VideoModel) {
        return await this.vodcfsVideoService.findVodcfsVideoByVideo(video.id);
    }
}
