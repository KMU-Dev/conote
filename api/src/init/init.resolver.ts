import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OAuth2UserModel } from '../google/models/oauth2-user.model';
import { CreateUserInput } from '../user/models/create-user.model';
import { UserModel } from '../user/models/user.model';
import { DefaultValidationPipe } from '../utils/pipes/default-validation.pipe';
import { InitGuard } from './init.guard';
import { InitService } from './init.service';
import { InitialGoogleLinkInput } from './models/google-link.model';

@Resolver()
@UseGuards(InitGuard)
export class InitResolver {
    constructor(private readonly initService: InitService) {}

    @Mutation(() => OAuth2UserModel)
    async initialGoogleLink(@Args('input') input: InitialGoogleLinkInput) {
        return this.initService.getOAuth2User(input.code);
    }

    @Mutation(() => UserModel)
    async initialCreateAdmin(
        @Args('input', new DefaultValidationPipe({ groups: ['initial'] }))
        input: CreateUserInput,
    ) {
        return this.initService.createAdminUser(input);
    }
}
