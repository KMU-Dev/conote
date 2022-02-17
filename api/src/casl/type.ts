import { User, Video, VodcfsSession } from '.prisma/client';
import { Ability } from '@casl/ability';
import { Action } from './action';

export type AppSubjects = User | 'User' | VodcfsSession | 'VodcfsSession' | Video | 'Video' | 'all';

export type AppAbility = Ability<[Action, AppSubjects]>;
