import { ObjectType } from '@nestjs/graphql';

@ObjectType('OAuth2User')
export class OAuth2UserModel {
    name: string;

    email: string;

    studentId: string;

    picture: string;
}
