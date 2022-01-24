import { Prisma, PrismaPromise } from '.prisma/client';

type OptionObject = Record<string, unknown> | null;

export interface BaseFindManyArgs {
    select?: OptionObject;
    include?: OptionObject;
    where?: Record<string, unknown>;
    orderBy?: Prisma.Enumerable<Record<string, unknown>>;
    cursor?: Record<string, unknown>;
    take?: number;
    skip?: number;
    distinct?: Prisma.Enumerable<unknown>;
}

export interface BaseCreateArgs {
    select?: OptionObject;
    include?: OptionObject;
    data: Record<string, unknown>;
}

export interface BaseCountArgs extends Omit<BaseFindManyArgs, 'select' | 'include'> {
    select?: OptionObject | true;
}

export interface CrudTypeMap<Entity> {
    client: PrismaPromise<Entity | null>;
    findUnique: unknown;
    findFirst: unknown;
    findMany: BaseFindManyArgs;
    create: BaseCreateArgs;
    createMany: unknown;
    delete: unknown;
    update: unknown;
    deleteMany: unknown;
    updateMany: unknown;
    upsert: unknown;
    count: BaseCountArgs;
    aggreate: unknown;
    groupBy: unknown;
}
