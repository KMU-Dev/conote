import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { captureException, Scope } from '@sentry/node';
import { GraphQLResolveInfo } from 'graphql';
import { Path } from 'graphql/jsutils/Path';
import { SentryInterceptor } from './sentry.interceptor';

@Injectable()
export class SentryGraphQLInterceptor extends SentryInterceptor {
    protected captureException(context: ExecutionContext, scope: Scope, error: any) {
        if (context.getType<GqlContextType>() === 'graphql') {
            const gqlContext = GqlExecutionContext.create(context);
            this.captureGraphQLException(gqlContext, scope, error);
        } else {
            super.captureException(context, scope, error);
        }
    }

    private captureGraphQLException(gqlContext: GqlExecutionContext, scope: Scope, error: any) {
        const context = gqlContext.getContext();
        const info: GraphQLResolveInfo = gqlContext.getInfo();
        const args = gqlContext.getArgs();
        const resolver = gqlContext.getClass();
        const handler = gqlContext.getHandler();

        super.setBasicScope(scope, context.res);

        // set transaction name
        const operatoinType = info.operation.operation;
        const operationName = info.fieldNodes[0].name.value;
        const transactioName = `${operatoinType.charAt(0).toUpperCase()}${operatoinType.slice(1)} ${operationName}`;
        scope.setTransactionName(transactioName);

        // set operation related data
        scope.setTag('type', operatoinType);
        scope.setContext('operation', {
            name: context.req.body.operationName,
            query: context.req.body.query,
            variables: context.req.body.variables,
        });

        // set resolver related data
        scope.setTag('resolver', resolver.name);
        scope.setTag('handler', handler.name);
        scope.setContext('resolver', {
            name: resolver.name,
            handler: handler.name,
            path: this.buildReadablePath(info.path),
            args: args,
        });

        // capture event
        const eventId = captureException(error);
        context.res.sentry = eventId;
    }

    private buildReadablePath(path: Path) {
        const keys: Array<string | number> = [];
        while (path) {
            keys.push(path.key);
            path = path.prev;
        }
        return keys.reverse().join('.');
    }
}
