import { gql } from "@apollo/client";

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
