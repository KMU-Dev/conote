import { CanActivate, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InitGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate() {
        const count = await this.prisma.user.count();
        return count === 0;
    }
}
