import { InputType, OmitType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@InputType()
export class CreateUserInput extends OmitType(
    UserModel,
    ['id', 'status', 'createdAt', 'updatedAt'] as const,
    InputType,
) {}
