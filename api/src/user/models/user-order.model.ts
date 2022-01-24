import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../utils/graphql/connection/order';

export enum UserOrderField {
    NAME = 'name',
    STUDENT_ID = 'studentId',
    EMAIL = 'email',
    ROLE = 'role',
    STATUS = 'status',
}

registerEnumType(UserOrderField, { name: 'UserOrderField' });

@InputType()
export class UserOrder extends Order(UserOrderField) {}
