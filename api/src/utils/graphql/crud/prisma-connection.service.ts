import { Prisma, User } from '.prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserModel } from '../../../user/models/user.model';
import { ConnectionArgs } from '../connection/argument';
import { AbstractPrismaConnectionService } from './abstract-prisma-connection.service';
import { CrudTypeMap } from './interfaces/crud-type-map';

interface UserTypeMap extends CrudTypeMap<User> {
    client: Prisma.Prisma__UserClient<User | null>;
    findUnique: Prisma.UserFindUniqueArgs;
    findFirst: Prisma.UserFindFirstArgs;
    findMany: Prisma.UserFindManyArgs;
    create: Prisma.UserCreateArgs;
    createMany: Prisma.UserCreateManyArgs;
    delete: Prisma.UserDeleteArgs;
    update: Prisma.UserUpdateArgs;
    deleteMany: Prisma.UserDeleteArgs;
    updateMany: Prisma.UserUpdateManyArgs;
    upsert: Prisma.UserUpsertArgs;
    count: Prisma.UserCountArgs;
    aggreate: Prisma.UserAggregateArgs;
    groupBy: Prisma.UserGroupByArgs;
}

export class PrismaConnectionService extends AbstractPrismaConnectionService<UserModel, User, UserTypeMap> {
    getCursorField(): keyof Prisma.UserWhereUniqueInput {
        return 'id';
    }

    parseCursor(beforeOrAfter: string) {
        return +beforeOrAfter;
    }

    getEntityName(): keyof PrismaService {
        return 'user';
    }
}
