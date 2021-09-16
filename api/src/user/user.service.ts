import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaConnectionService } from '../utils/graphql/crud/abstract-prisma-connection.service';
import { CreateUserInput } from './models/create-user.model';
import { UserModel } from './models/user.model';
import { UserTypeMap } from './type';

@Injectable()
export class UserService extends PrismaConnectionService<UserModel, User, UserTypeMap>('user', 'id') {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly prisma: PrismaService) {
        super();
    }

    protected parseCursor(beforeOrAfter: string): string | number {
        return +beforeOrAfter;
    }

    async createUser(userInput: CreateUserInput) {
        const user: Prisma.UserCreateInput = {
            ...userInput,
            ...{ status: 'UNVERIFIED', createdAt: new Date() },
        };
        return await this.prisma.user.create({
            data: user,
        });
    }

    async getUserById(id: number) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async getUserCount() {
        return await this.prisma.user.count();
    }
}
