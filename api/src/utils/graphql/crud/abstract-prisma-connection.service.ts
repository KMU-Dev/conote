import { PrismaService } from '../../../prisma/prisma.service';
import { ConnectionArgs } from '../connection/argument';
import { IConnectionService } from './interfaces/connection.service';
import { IConnectionType, IEdgeType, IPageInfoType } from '../connection/type';
import { Delegate } from './interfaces/delegate';
import { CrudTypeMap } from './interfaces/crud-type-map';
import { Logger } from '@nestjs/common';

export abstract class AbstractPrismaConnectionService<
    Model,
    Entity extends Model,
    TypeMap extends CrudTypeMap<Entity>,
    Args extends ConnectionArgs = ConnectionArgs,
> implements IConnectionService<Args, Model>
{
    private readonly _logger = new Logger(AbstractPrismaConnectionService.name);

    constructor(protected readonly prisma: PrismaService) {}

    async getConnection(args: Args): Promise<IConnectionType<Model>> {
        const cursor = args.first
            ? args.after && this.parseCursor(args.after)
            : args.before && this.parseCursor(args.before);
        const takeLength = args.first ? args.first + 1 : args.last + 1;
        const take = args.first ? takeLength : -takeLength;

        const entities = await (
            this.prisma[this.getEntityName()] as unknown as Delegate<Entity, CrudTypeMap<Entity>>
        ).findMany({
            cursor: cursor && { [this.getCursorField()]: cursor },
            take,
            skip: cursor && 1,
        });

        const hasNext = entities.length === takeLength;

        const edges: IEdgeType<Model>[] = entities
            .filter((_entity, index) => !(hasNext && index === takeLength - 1))
            .map((entity) => ({
                cursor: `${entity[this.getCursorField() as keyof typeof entity]}`,
                node: entity,
            }));

        const pageInfo: IPageInfoType = {
            hasPreviousPage: typeof cursor !== 'undefined',
            hasNextPage: hasNext,
            startCursor: edges.length > 0 && `${edges[0].cursor}`,
            endCursor: `${edges.length > 0 && edges[edges.length - 1].cursor}`,
        };

        return { edges, pageInfo } as IConnectionType<Model>;
    }

    protected abstract getEntityName(): keyof PrismaService;

    protected abstract getCursorField(): keyof Parameters<Delegate<Entity, TypeMap>['findMany']>[0]['cursor'];

    protected abstract parseCursor(
        beforeOrAfter: string,
    ): Parameters<Delegate<Entity, TypeMap>['findMany']>[0]['cursor'][ReturnType<
        AbstractPrismaConnectionService<Model, Entity, TypeMap, Args>['getCursorField']
    >];
}
