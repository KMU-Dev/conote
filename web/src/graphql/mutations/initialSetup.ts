import { gql } from "@apollo/client";
import { OAuth2User } from "../type/OAuth2User";
import { User } from "../type/user";
import { GraqhqlDto } from "./type";

export const INITIAL_GOOGLE_LINK = gql`
    mutation InitialGoogleLink($input: InitialGoogleLinkInput!) {
        initialGoogleLink(googleLinkInput: $input) {
            name
            email
            studentId
            picture
        }
    }
`;

export interface InitialGoogleLinkDto extends GraqhqlDto {
    initialGoogleLink: OAuth2User;
}

export const INITIAL_CREATE_ADMIN = gql`
    mutation InitialCreateAdmin($input: CreateUserInput!) {
        initialCreateAdmin(createUserInput: $input) {
            id
            role
            status
            name
            email
            studentId
            picture
            createdAt
            updatedAt
        }
    }
`;

export interface InitialCreateAdminDto extends GraqhqlDto {
    initialCreateAdmin: User;
}
