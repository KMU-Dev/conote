import { User } from '.prisma/client';
import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './action';
import { AppAbility } from './type';

@Injectable()
export class CaslAbilityFactory {
    createAbility(user?: User) {
        const { can, build } = new AbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>);

        if (user) {
            if (user.role === 'ADMIN') {
                can(Action.Manage, 'all');
            } else {
                // user
                can(Action.Read, 'User', { id: user.id });

                // vodcfs session
                can(Action.Create, 'VodcfsSession');
                can(Action.Update, 'VodcfsSession');

                // video
                can(Action.Create, 'Video');
            }
        }

        return build();
    }
}
