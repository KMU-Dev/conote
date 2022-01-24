import { subject } from '@casl/ability';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Action } from '../action';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { AppSubjects } from '../type';
import { GraphQLContext } from '../../utils/graphql/type';

@Injectable()
export class PoliciesGuard implements CanActivate {
    private readonly logger = new Logger(PoliciesGuard.name);

    constructor(private readonly reflector: Reflector, private readonly caslAbilityFactory: CaslAbilityFactory) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const actions = this.reflector.getAllAndOverride<Action[]>('actions', [ctx.getHandler(), ctx.getClass()]);
        if (!actions || actions.length === 0) return true;

        const user = ctx.getContext<GraphQLContext>().req.user;
        const args = ctx.getArgs();
        const info = ctx.getInfo();
        const domain = this.reflector.getAllAndOverride<string>('domain', [ctx.getHandler(), ctx.getClass()]);
        const ability = this.caslAbilityFactory.createAbility(user);

        if (info.operation.operation === 'query') {
            return actions.every((action) => ability.can(action, domain as AppSubjects));
        }

        return actions.every((action) => {
            for (const key in args) {
                if (action === Action.CreateMultiple) {
                    for (const item of args[key].items) {
                        if (!ability.can(action, subject(domain, item))) return false;
                    }
                } else if (!ability.can(action, subject(domain, args[key]))) return false;
            }
            return true;
        });
    }
}
