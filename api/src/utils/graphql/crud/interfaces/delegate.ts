import { Prisma, PrismaPromise } from '.prisma/client';
import { CrudTypeMap } from './crud-type-map';

export interface Delegate<Entity, TypeMap extends CrudTypeMap<Entity>> {
    findUnique<T extends TypeMap['findUnique']>(args: Prisma.SelectSubset<T, TypeMap['findUnique']>): TypeMap['client'];
    findFirst<T extends TypeMap['findFirst']>(args: Prisma.SelectSubset<T, TypeMap['findFirst']>): TypeMap['client'];
    findMany<T extends TypeMap['findMany']>(args: Prisma.SelectSubset<T, TypeMap['findMany']>): PrismaPromise<Entity[]>;
    create<T extends TypeMap['create']>(args: Prisma.SelectSubset<T, TypeMap['create']>): TypeMap['client'];
    createMany<T extends TypeMap['createMany']>(
        args: Prisma.SelectSubset<T, TypeMap['createMany']>,
    ): PrismaPromise<Prisma.BatchPayload>;
    delete<T extends TypeMap['delete']>(args: Prisma.SelectSubset<T, TypeMap['delete']>): TypeMap['client'];
    update<T extends TypeMap['update']>(args: Prisma.SelectSubset<T, TypeMap['update']>): TypeMap['client'];
    deleteMany<T extends TypeMap['deleteMany']>(
        args: Prisma.SelectSubset<T, TypeMap['deleteMany']>,
    ): PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TypeMap['updateMany']>(
        args: Prisma.SelectSubset<T, TypeMap['updateMany']>,
    ): PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends TypeMap['upsert']>(args: Prisma.SelectSubset<T, TypeMap['upsert']>): TypeMap['client'];
    count<T extends TypeMap['count']>(args: Prisma.SelectSubset<T, TypeMap['count']>): number;
    // aggreate and groupBy is ommited
}
