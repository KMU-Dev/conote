import { PrismaService } from '../../../prisma/prisma.service';
import { ConnectionArgs } from '../connection/argument';
import { IConnectionService } from './interfaces/connection.service';
import { IConnectionType, IEdgeType, IPageInfoType } from '../connection/type';
import { Delegate } from './interfaces/delegate';
import { CrudTypeMap } from './interfaces/crud-type-map';
import { Logger, Type } from '@nestjs/common';

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
                cursor: cursor && { [cursorField]: cursor },
                take,
                skip: cursor && 1,
            });
            const count = await this.getDelegate().count({ where: this.getQueryWhere(args) });

            const hasNext = entities.length === takeLength;

            const edges: IEdgeType<Model>[] = entities
                .filter((_entity, index) => !(hasNext && index === (args.first ? takeLength - 1 : 0)))
                .map((entity) => ({
                    cursor: `${entity[cursorField as keyof typeof entity]}`,
                    node: entity,
                }));

            const pageInfo: IPageInfoType = {
                hasPreviousPage: typeof cursor !== 'undefined',
                hasNextPage: hasNext,
                startCursor: edges.length > 0 && `${edges[0].cursor}`,
                endCursor: `${edges.length > 0 && edges[edges.length - 1].cursor}`,
            };

            return { edges, pageInfo, count } as IConnectionType<Model>;
        }

        protected abstract parseCursor(
            beforeOrAfter: string,
        ): Parameters<Delegate<Entity, TypeMap>['findMany']>[0]['cursor'][typeof cursorField];

        protected abstract getQueryWhere<T extends Record<string, unknown>>(args: Args): T | undefined;

        private getDelegate() {
            return this.prisma[entityName] as unknown as Delegate<Entity, CrudTypeMap<Entity>>;
        }
    }

    return AbstractPrismaConnectionService as unknown as Type<IConnectionService<Args, Model>>;
}
