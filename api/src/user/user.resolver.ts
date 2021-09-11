import { Resolver, Query } from '@nestjs/graphql';
import { UserModel } from './models/user.model';

@Resolver(() => UserModel)
export class UserResolver {
    @Query(() => UserModel)
    async user() {
        // stub
    }
}
