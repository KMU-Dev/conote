import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLContext } from '../../utils/graphql/type';

export const CurrentUser = createParamDecorator((_data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const graphqlContext = ctx.getContext<GraphQLContext>();
    return graphqlContext.req.user;
});
