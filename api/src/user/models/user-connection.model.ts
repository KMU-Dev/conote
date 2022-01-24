import { ObjectType } from '@nestjs/graphql';
import { Connection } from '../../utils/graphql/connection/connection.model';
import { UserModel } from './user.model';

@ObjectType()
export class UserConnection extends Connection(UserModel, 'User') {}
