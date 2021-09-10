import { ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../user/models/user.model';

@ObjectType()
export class UIStatus {
    initialSetup: boolean;

    user?: UserModel;
}
