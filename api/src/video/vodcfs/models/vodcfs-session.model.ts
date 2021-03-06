import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { VodcfsSessionStatus } from '@prisma/client';
import { IsString } from 'class-validator';
import { UserModel } from '../../../user/models/user.model';

@ObjectType('VodcfsSession')
export class VodcfsSessionModel {
    @Field(() => ID)
    @IsString()
    id: string;

    @Field(() => UserModel)
    user: UserModel;

    captcha: string;

    captchaAnswer?: string;

    errorReason?: string;

    @Field(() => VodcfsSessionStatus)
    status: VodcfsSessionStatus;

    createdAt: Date;
}

registerEnumType(VodcfsSessionStatus, {
    name: 'VodcfsSessionStatus',
});
