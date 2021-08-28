import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './models/login-input.model';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Query(() => String)
    async foo() {
        // stubs here
    }

    @Mutation(() => Boolean, {
        description: "Exchange Google OAuth2 authorization code to conote's jwt token",
    })
    async login(@Args('loginInput') loignInput: LoginInput) {
        return this.authService.login(loignInput.code);
    }
}
