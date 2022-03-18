import { Logger, Type } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConnectionArgs } from '../connection/argument';
import { IConnectionType, IEdgeType, IPageInfoType } from '../connection/type';
import { IConnectionService } from './interfaces/connection.service';
import { CrudTypeMap } from './interfaces/crud-type-map';
import { Delegate } from './interfaces/delegate';

export function PrismaConnectionService<
    Model,
    Entity extends Model,
    TypeMap extends CrudTypeMap<Entity>,
    Args extends ConnectionArgs = ConnectionArgs,
>(
    entityName: keyof PrismaService,
    cursorField: keyof Parameters<Delegate<Entity, TypeMap>['findMany']>[0]['cursor'],
): Type<IConnectionService<Args, Model>> {
    abstract class AbstractPrismaConnectionService implements IConnectionService<Args, Model> {
        private readonly _logger = new Logger(AbstractPrismaConnectionService.name);

        constructor(protected readonly prisma: PrismaService) {}

        async getConnection(args: Args): Promise<IConnectionType<Model>> {
            const cursor = args.first
                ? args.after && this.parseCursor(args.after)
                : args.before && this.parseCursor(args.before);
            const takeLength = args.first ? args.first + 1 : args.last + 1;
            const take = args.first ? takeLength : -takeLength;

            const entities = await this.getDelegate().findMany({
                where: this.getQueryWhere(args),
                orderBy: this.getQueryOrderBy(args),
                cursor: cursor && { [cursorField]: cursor },
                take,
                skip: cursor && 1,
            });
            const count = await this.getDelegate().count({
                where: this.getQueryWhere(args),
                orderBy: this.getQueryOrderBy(args),
            });

            const hasNext = entities.length === takeLength;
            const hasPrevious = typeof cursor !== 'undefined';

            const edges: IEdgeType<Model>[] = entities
                .filter((_entity, index) => !(hasNext && index === (args.first ? takeLength - 1 : 0)))
                .map((entity) => ({
                    cursor: `${entity[cursorField as keyof typeof entity]}`,
                    node: entity,
                }));

            const pageInfo: IPageInfoType = {
                hasPreviousPage: take > 0 ? hasPrevious : hasNext,
                hasNextPage: take > 0 ? hasNext : hasPrevious,
                startCursor: edges.length > 0 && `${edges[0].cursor}`,
                endCursor: `${edges.length > 0 && edges[edges.length - 1].cursor}`,
            };

            return { edges, pageInfo, count } as IConnectionType<Model>;
        }

        protected abstract parseCursor(
            beforeOrAfter: string,
        ): Parameters<Delegate<Entity, TypeMap>['findMany']>[0]['cursor'][typeof cursorField];

        protected abstract getQueryWhere<T extends Record<string, unknown>>(args: Args): T | undefined;

        protected abstract getQueryOrderBy<T extends Prisma.Enumerable<Record<string, unknown>>>(
            args: Args,
        ): T | undefined;

        private getDelegate() {
            return this.prisma[entityName] as unknown as Delegate<Entity, CrudTypeMap<Entity>>;
        }
    }

    return AbstractPrismaConnectionService as unknown as Type<IConnectionService<Args, Model>>;
}
