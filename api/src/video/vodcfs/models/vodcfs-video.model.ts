import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { VodcfsVideoErrorReason, VodcfsVideoResolution, VodcfsVideoStatus } from '@prisma/client';
import { VideoIndexModel } from '../../models/video-index.model';

@ObjectType('VodcfsVideo')
export class VodcfsVideoModel {
    @Field(() => ID)
    id: number;

    title: string;

    duration?: string;

    size: number;

    streamingId?: string;

    @Field(() => [VodcfsVideoResolution])
    resolutions: VodcfsVideoResolution[];

    @Field(() => [VideoIndexModel])
    indexes: VideoIndexModel[];

    @Field(() => VodcfsVideoErrorReason)
    errorReason?: VodcfsVideoErrorReason;

    @Field(() => VodcfsVideoStatus)
    status: VodcfsVideoStatus;

    createdAt: Date;
}

registerEnumType(VodcfsVideoResolution, {
    name: 'VodcfsVideoResolution',
});

registerEnumType(VodcfsVideoErrorReason, {
    name: 'VodcfsVideoErrorReason',
});

registerEnumType(VodcfsVideoStatus, {
    name: 'VodcfsVideoStatus',
});
