import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLContext } from '../graphql/type';

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const graphqlContext = context.getContext<GraphQLContext>();
    const request = graphqlContext.req;
    return data ? request.cookies?.[data] : request.cookies;
});
