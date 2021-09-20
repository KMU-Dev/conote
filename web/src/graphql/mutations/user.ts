import { gql } from '@apollo/client';

export const CREATE_MULTIPLE_USERS = gql`
    mutation CreateMultipleUsers($input: CreateMultipleUsersInput!) {
        createMultipleUsers(createMultipleUsersInput: $input) {
            count
        }
    }
`;
