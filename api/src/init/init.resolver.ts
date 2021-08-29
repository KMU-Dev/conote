import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InitialGoogleLinkInput } from './models/google-link.model';
import { OAuth2UserModel } from '../google/models/oauth2-user.model';
import { InitService } from './init.service';
import { CreateUserInput } from '../user/models/create-user.model';
import { UserModel } from '../user/models/user.model';

@Resolver()
export class InitResolver {
    constructor(private readonly initService: InitService) {}

    @Mutation(() => OAuth2UserModel)
    async initialGoogleLink(@Args('googleLinkInput') input: InitialGoogleLinkInput) {
        return this.initService.getOAuth2User(input.code);
    }

    @Mutation(() => UserModel)
    async initialCreateAdmin(@Args('createUserInput') input: CreateUserInput) {
        return this.initService.createAdminUser(input);
    }
}
