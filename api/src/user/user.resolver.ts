import { Resolver, Query, Args } from '@nestjs/graphql';
import { ConnectionArgs } from '../utils/graphql/connection/argument';
import { UserConnection } from './models/user-connection.model';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserConnection)
    async user(@Args() args: ConnectionArgs) {
        return this.userService.getConnection(args);
    }
}
