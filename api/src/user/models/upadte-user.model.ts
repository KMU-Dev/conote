import { InputType, IntersectionType, PartialType, PickType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.model';
import { UserModel } from './user.model';

@InputType()
export class UpdateUserInput extends IntersectionType(
    PickType(UserModel, ['id'] as const, InputType),
    PartialType(IntersectionType(CreateUserInput, PickType(UserModel, ['status'] as const, InputType))),
) {}
