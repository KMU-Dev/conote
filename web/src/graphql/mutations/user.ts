import { gql } from '@apollo/client';

export const CREATE_MULTIPLE_USERS = gql`
    mutation CreateMultipleUsers($input: CreateMultipleUsersInput!) {
        createMultipleUsers(input: $input) {
            count
        }
    }
`;

export const UPDATE_USER_LIST = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            name
            email
            studentId
            status
            role
            picture
        }
    }
`;

export const DELETE_MULTIPLE_USERS = gql`
    mutation DeleteMultipleUsers($input: DeleteMultipleUsersInput!) {
        deleteMultipleUsers(input: $input) {
            count
        }
    }
`;
