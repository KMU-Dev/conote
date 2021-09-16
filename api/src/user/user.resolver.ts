import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ConnectionArgs } from '../utils/graphql/connection/argument';
import { BatchPayload } from '../utils/graphql/models/batch-payload.model';
import { CreateMultipleUsersInput } from './models/create-multiple-users.model';
import { CreateUserInput } from './models/create-user.model';
import { DeleteUserInput } from './models/delete-user.model';
import { UpdateUserInput } from './models/upadte-user.model';
import { UserConnection } from './models/user-connection.model';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserConnection)
    async user(@Args() args: ConnectionArgs) {
        return await this.userService.getConnection(args);
    }

    @Mutation(() => UserModel)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return await this.userService.createUser(createUserInput);
    }

    @Mutation(() => BatchPayload)
    async createMultipleUsers(@Args('createMultipleUsersInput') createMultipleUserInput: CreateMultipleUsersInput) {
        return await this.userService.createMultipleUsers(createMultipleUserInput);
    }

    @Mutation(() => UserModel)
    async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return await this.userService.updateUser(updateUserInput);
    }

    @Mutation(() => UserModel)
    async deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput) {
        return await this.userService.deleteUser(deleteUserInput);
    }
}
