import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { VideoUploadService } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { UserModel } from '../../user/models/user.model';
import { VodcfsVideoModel } from '../vodcfs/models/vodcfs-video.model';
import { VideoIndexModel } from './video-index.model';

@ObjectType('Video')
export class VideoModel {
    @Field(() => ID)
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    title: string;

    @IsOptional()
    @IsUrl({ require_protocol: true })
    thumbnail?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    duration?: string;

    @Field(() => [VideoIndexModel])
    indexes: VideoIndexModel[];

    @Field(() => VideoUploadService)
    @IsNotEmpty()
    @IsEnum(VideoUploadService)
    uploadService: VideoUploadService;

    @Field(() => VodcfsVideoModel)
    vodcfsVideo?: VodcfsVideoModel;

    @Field(() => UserModel)
    user: UserModel;

    createdAt: Date;

    updatedAt: Date;
}

registerEnumType(VideoUploadService, {
    name: 'VideoUploadService',
});
