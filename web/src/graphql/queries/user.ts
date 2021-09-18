import { gql } from '@apollo/client';

export const USER_CONNECTION = gql`
    query User($first: Int, $after: String) {
        user(first: $first, after: $after) {
            edges {
                node {
                    id
                    name
                    studentId
                    email
                    role
                    status
                    picture
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
`;
