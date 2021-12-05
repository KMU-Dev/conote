import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaConnectionService } from '../utils/graphql/crud/abstract-prisma-connection.service';
import { CreateMultipleUsersInput } from './models/create-multiple-users.model';
import { CreateUserInput } from './models/create-user.model';
import { DeleteUserInput } from './models/delete-user.model';
import { UpdateUserInput } from './models/upadte-user.model';
import { UserConnectionArgs } from './models/user-connection-args.model';
import { UserModel } from './models/user.model';
import { UserTypeMap } from './type';

@Injectable()
export class UserService extends PrismaConnectionService<UserModel, User, UserTypeMap, UserConnectionArgs>(
    'user',
    'id',
) {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly prisma: PrismaService) {
        super();
    }

    protected parseCursor(beforeOrAfter: string): string | number {
        return +beforeOrAfter;
    }

    protected getQueryWhere(args: UserConnectionArgs): Prisma.UserWhereInput | undefined {
        return (
            args.query && {
                OR: [
                    { name: { contains: args.query } },
                    { email: { contains: args.query } },
                    { studentId: { contains: args.query } },
                ],
            }
        );
    }

    async createUser(userInput: CreateUserInput) {
        const user: Prisma.UserCreateInput = {
            ...userInput,
            ...{ status: 'UNVERIFIED', createdAt: new Date() },
        };

        return await this.prisma.user.create({
            data: user,
        });
    }

    async createMultipleUsers(userInputs: CreateMultipleUsersInput) {
        const users: Prisma.UserCreateManyInput[] = userInputs.items.map((userInput) => ({
            ...userInput,
            ...{ status: 'UNVERIFIED', createdAt: new Date() },
        }));

        return await this.prisma.user.createMany({
            data: users,
            skipDuplicates: true,
        });
    }

    async updateUser(updateUserInput: UpdateUserInput) {
        const { id, ...user } = updateUserInput;

        return await this.prisma.user.update({
            where: { id: +id },
            data: user,
        });
    }

    async deleteUser(deleteUserInput: DeleteUserInput) {
        return await this.prisma.user.delete({
            where: { id: +deleteUserInput.id },
            include: { oauth: true, refreshTokens: true },
        });
    }

    async getUserById(id: number) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async getUserByStudenId(studentId: string) {
        return await this.prisma.user.findUnique({
            where: { studentId },
        });
    }

    async getUserCount() {
        return await this.prisma.user.count();
    }
}
