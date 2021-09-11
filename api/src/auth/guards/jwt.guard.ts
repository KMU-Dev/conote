import { User } from '.prisma/client';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GraphQLContext } from '../../utils/graphql/type';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext<GraphQLContext>();

        return super.canActivate(new ExecutionContextHost([req]));
    }

    handleRequest<TUser extends User>(err: Error, user: TUser) {
        if (err || !user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
