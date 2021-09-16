import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ConnectionArgs } from '../utils/graphql/connection/argument';
import { IEdgeType, IPageInfoType } from '../utils/graphql/connection/type';
import { AbstractPrismaConnectionService } from '../utils/graphql/crud/abstract-prisma-connection.service';
import { CreateUserInput } from './models/create-user.model';
import { UserConnection } from './models/user-connection.model';
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

    async getUserConnection(args: ConnectionArgs): Promise<UserConnection> {
        const cursorId = args.first ? args.after && +args.after : args.before && +args.before;
        const takeLength = args.first ? args.first + 1 : args.last + 1;
        const take = args.first ? takeLength : -takeLength;

        const users = await this.prisma.user.findMany({
            cursor: cursorId && { id: cursorId },
            take,
            skip: cursorId && 1,
        });

        const hasNext = users.length === takeLength;

        const edges: IEdgeType<UserModel>[] = users
            .filter((_user, index) => !(hasNext && index === takeLength - 1))
            .map((user) => ({
                cursor: `${user.id}`,
                node: user,
            }));

        const pageInfo: IPageInfoType = {
            hasPreviousPage: typeof cursorId !== 'undefined',
            hasNextPage: hasNext,
            startCursor: edges.length > 0 && `${edges[0].cursor}`,
            endCursor: `${edges.length > 0 && edges[edges.length - 1].cursor}`,
        };

        return { edges, pageInfo };
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
