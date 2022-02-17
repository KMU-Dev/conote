import { InputType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { VodcfsSessionModel } from './vodcfs-session.model';

@InputType()
export class AuthenticateVodcfsSessionInput extends PickType(VodcfsSessionModel, ['id'] as const, InputType) {
    @IsNotEmpty()
    @IsString()
    captchaAnswer: string;
}
