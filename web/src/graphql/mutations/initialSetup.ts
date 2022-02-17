import { gql } from "@apollo/client";

export const INITIAL_GOOGLE_LINK = gql`
    mutation InitialGoogleLink($input: InitialGoogleLinkInput!) {
        initialGoogleLink(input: $input) {
            name
            email
            studentId
            picture
        }
    }
`;

export const INITIAL_CREATE_ADMIN = gql`
    mutation InitialCreateAdmin($input: CreateUserInput!) {
        initialCreateAdmin(input: $input) {
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
