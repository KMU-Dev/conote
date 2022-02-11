import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Cookies } from '../utils/decorators/cookies.decorator';
import { GraphQLContext } from '../utils/graphql/type';
import { AuthService } from './auth.service';
import { AuthPayload } from './models/auth-payload.model';
import { LoginInput } from './models/login-input.model';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => AuthPayload, {
        description: "Exchange Google OAuth2 authorization code to conote's jwt token",
    })
    async login(@Args('input') input: LoginInput, @Context() context: GraphQLContext) {
        return this.authService.login(input.code, context);
    }

    @Mutation(() => AuthPayload)
    async refreshToken(@Cookies('rt') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }

    @Mutation(() => Boolean)
    async logout(@Cookies('rt') refreshToken?: string) {
        return this.authService.logout(refreshToken);
    }
}
