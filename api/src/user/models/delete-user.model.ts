import { InputType, PickType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@InputType()
export class DeleteUserInput extends PickType(UserModel, ['id'] as const, InputType) {}
