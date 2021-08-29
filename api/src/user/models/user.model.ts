import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole, UserStatus } from '@prisma/client';

@ObjectType('User')
export class UserModel {
    @Field(() => ID)
    id: number;

    name: string;

    email?: string;

    studentId: string;

    picture?: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field(() => UserStatus)
    status: UserStatus;

    createdAt: Date;

    updatedAt: Date;
}

registerEnumType(UserRole, {
    name: 'UserRole',
});

registerEnumType(UserStatus, {
    name: 'UserStatus',
});
