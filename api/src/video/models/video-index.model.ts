import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('VideoIndex')
export class VideoIndexModel {
    @Field(() => ID)
    id: number;

    title: string;

    time: number;
}
