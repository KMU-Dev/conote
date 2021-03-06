import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole, UserStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

@ObjectType('User')
export class UserModel {
    @Field(() => ID)
    @IsNotEmpty({ always: true })
    id: number;

    @IsNotEmpty({ always: true })
    @MaxLength(256, { always: true })
    name: string;

    @IsOptional({ always: true })
    @IsEmail(undefined, { always: true })
    email?: string;

    @IsNotEmpty({ always: true })
    @MaxLength(64, { always: true })
    studentId: string;

    @IsOptional({ always: true })
    @IsUrl({ require_protocol: true }, { always: true })
    picture?: string;

    @Field(() => UserRole)
    @IsEnum(UserRole, { always: true })
    @IsIn(['ADMIN'], { groups: ['initial'] })
    role: UserRole;

    @Field(() => UserStatus)
    @IsEnum(UserStatus, { always: true })
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
