import { gql } from '@apollo/client';

export const USER_CONNECTION = gql`
    query User($first: Int, $after: String, $last: Int, $before: String, $query: String) {
        user(first: $first, after: $after, last: $last, before: $before, query: $query) {
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
            count
        }
    }
`;
