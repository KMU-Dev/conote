import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UIStatus } from './models/ui-status.model';

@Injectable()
export class UiService {
    constructor(private readonly userService: UserService) {}

    async getUiService(user?: User): Promise<UIStatus> {
        const userCount = await this.userService.getUserCount();
        return { user, initialSetup: userCount === 0 };
    }
}
