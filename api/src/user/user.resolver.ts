import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Action } from '../casl/action';
import { Actions } from '../casl/decorators/actions.decorator';
import { Domain } from '../casl/decorators/domain.decorator';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { ConnectionArgs } from '../utils/graphql/connection/argument';
import { BatchPayload } from '../utils/graphql/models/batch-payload.model';
import { CreateMultipleUsersInput } from './models/create-multiple-users.model';
import { CreateUserInput } from './models/create-user.model';
import { DeleteUserInput } from './models/delete-user.model';
import { UpdateUserInput } from './models/upadte-user.model';
import { UserConnection } from './models/user-connection.model';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Domain('User')
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Resolver(() => UserModel)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Actions(Action.List)
    @Query(() => UserConnection)
    async user(@Args() args: ConnectionArgs) {
        return await this.userService.getConnection(args);
    }

    @Actions(Action.Create)
    @Mutation(() => UserModel)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return await this.userService.createUser(createUserInput);
    }

    @Actions(Action.CreateMultiple)
    @Mutation(() => BatchPayload)
    async createMultipleUsers(@Args('createMultipleUsersInput') createMultipleUserInput: CreateMultipleUsersInput) {
        return await this.userService.createMultipleUsers(createMultipleUserInput);
    }

    @Actions(Action.Update)
    @Mutation(() => UserModel)
    async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return await this.userService.updateUser(updateUserInput);
    }

    @Actions(Action.Delete)
    @Mutation(() => UserModel)
    async deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput) {
        return await this.userService.deleteUser(deleteUserInput);
    }
}
