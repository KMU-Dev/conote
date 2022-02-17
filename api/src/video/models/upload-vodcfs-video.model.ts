import { Field, InputType, PickType } from '@nestjs/graphql';
import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { VideoModel } from './video.model';

@InputType('UploadVodcfsVideoInput')
export class UploadVodcfsVideoInput extends PickType(VideoModel, ['title'], InputType) {
    @Field(() => GraphQLUpload)
    @Allow()
    file: Promise<FileUpload>;

    @IsNotEmpty()
    @IsString()
    sessionId: string;
}
