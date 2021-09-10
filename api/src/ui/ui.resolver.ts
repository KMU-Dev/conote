import { User } from '.prisma/client';
import { Logger, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { JwtParseGuard } from '../auth/guards/jwt-parse.guard';
import { UIStatus } from './models/ui-status.model';
import { UiService } from './ui.service';

@Resolver()
export class UiResolver {
    private readonly logger = new Logger(UiResolver.name);

    constructor(private readonly uiService: UiService) {}

    @UseGuards(JwtParseGuard)
    @Query(() => UIStatus)
    async uiStatus(@CurrentUser() user: User) {
        return this.uiService.getUiService(user);
    }
}
