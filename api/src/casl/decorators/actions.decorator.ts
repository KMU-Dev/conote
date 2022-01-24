import { SetMetadata } from '@nestjs/common';
import { Action } from '../action';

export const Actions = (...actions: Action[]) => SetMetadata('actions', actions);
