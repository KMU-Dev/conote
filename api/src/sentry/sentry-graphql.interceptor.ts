import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Handlers, Scope } from '@sentry/node';
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
        const info = gqlContext.getInfo();
        const context = gqlContext.getContext();
        const args = gqlContext.getArgs();
        const root = gqlContext.getRoot();
        const clas = gqlContext.getClass();
        const handler = gqlContext.getHandler();

        console.log('info');
        console.log(info);
        console.log('context');
        console.log(context);
        console.log('args');
        console.log(args);
        console.log('root');
        console.log(root);
        console.log('class');
        console.log(clas);
        console.log('handler');
        console.log(handler);

        const data = Handlers.parseRequest({}, context.req, {});
    }
}
