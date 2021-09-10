import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(loginInput: $input) {
            accessToken
        }
    }
`;
