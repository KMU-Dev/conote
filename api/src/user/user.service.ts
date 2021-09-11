import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './models/create-user.model';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(userInput: CreateUserInput) {
        const user: Prisma.UserCreateInput = {
            ...userInput,
            ...{ status: 'UNVERIFIED', createdAt: new Date() },
        };
        return await this.prisma.user.create({
            data: user,
        });
    }

    async getUserById(id: number) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async getUserCount() {
        return await this.prisma.user.count();
    }
}
