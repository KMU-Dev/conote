import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AbstractPrismaConnectionService } from '../utils/graphql/crud/abstract-prisma-connection.service';
import { CreateUserInput } from './models/create-user.model';
import { UserModel } from './models/user.model';
import { UserTypeMap } from './type';

@Injectable()
export class UserService extends AbstractPrismaConnectionService<UserModel, User, UserTypeMap> {
    private readonly logger = new Logger(UserService.name);

    constructor(prisma: PrismaService) {
        super(prisma);
    }

    protected getEntityName(): keyof PrismaService {
        return 'user';
    }

    protected getCursorField(): keyof Prisma.UserWhereUniqueInput {
        return 'id';
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
