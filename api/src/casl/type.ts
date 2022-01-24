import { User } from '.prisma/client';
import { Ability } from '@casl/ability';
import { Action } from './action';

export type AppSubjects = User | 'User' | 'all';

export type AppAbility = Ability<[Action, AppSubjects]>;
