import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';

@Injectable()
export class JwtParseGuard extends JwtAuthGuard {
    handleRequest<TUser extends User>(err: Error, user: TUser) {
        if (err || !user) return undefined;
        return user;
    }
}
