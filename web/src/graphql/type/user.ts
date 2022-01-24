import { IsEmail, IsEnum, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';
import { OrderDirection } from './type';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class CreateUserInput {
    @IsNotEmpty()
    @MaxLength(256)
    name: String;

    @IsEmail()
    email?: String;

    @IsNotEmpty()
    @MaxLength(64)
    studentId: String;

    @IsUrl({ require_protocol: true })
    picture?: String;

    @IsEnum(UserRole)
    role: UserRole;
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    UNVERIFIED = 'UNVERIFIED',
    BANNED = 'BANNED',
}

export interface User {
    id: number;
    name: string;
    email?: string;
    studentId: string;
    picture?: string;
    role: UserRole;
    status: UserStatus;
    createdAt: number;
    updatedAt: number;
}

export enum UserOrderField {
    NAME = 'NAME',
    STUDENT_ID = 'STUDENT_ID',
    EMAIL = 'EMAIL',
    ROLE = 'ROLE',
    STATUS = 'STATUS',
}

export interface UserOrder {
    direction: OrderDirection;
    field: UserOrderField;
}

export interface UserConnectionArgs {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
    query?: string;
    order?: UserOrder;
}
