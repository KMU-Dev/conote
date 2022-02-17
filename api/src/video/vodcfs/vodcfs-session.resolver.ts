import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from '../../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Action } from '../../casl/action';
import { Actions } from '../../casl/decorators/actions.decorator';
import { Domain } from '../../casl/decorators/domain.decorator';
import { PoliciesGuard } from '../../casl/guards/policies.guard';
import { UserModel } from '../../user/models/user.model';
import { AuthenticateVodcfsSessionInput } from './models/create-vodcfs-session.model';
import { VodcfsSessionModel } from './models/vodcfs-session.model';
import { VodcfsSessionService } from './vodcfs-session.service';

@Domain('VodcfsSession')
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Resolver(() => VodcfsSessionModel)
export class VodcfsSessionResolver {
    constructor(private readonly vodcfsSessionService: VodcfsSessionService) {}

    @Actions(Action.Create)
    @Mutation(() => VodcfsSessionModel)
    async createVodcfsSession(@CurrentUser() user: User) {
        return this.vodcfsSessionService.createSession(user.id);
    }

    @Actions(Action.Update)
    @Mutation(() => VodcfsSessionModel)
    async authenticateVodcfsSession(@Args('input') input: AuthenticateVodcfsSessionInput) {
        return this.vodcfsSessionService.authenticateSession(input.id, input.captchaAnswer);
    }

    @ResolveField('user', () => UserModel)
    async getUser(@Parent() session: VodcfsSessionModel) {
        return this.vodcfsSessionService.getSessionUser(session.id);
    }
}
