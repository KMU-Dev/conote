import { Prisma, User } from '.prisma/client';
import { CrudTypeMap } from '../utils/graphql/crud/interfaces/crud-type-map';

export interface UserTypeMap extends CrudTypeMap<User> {
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
