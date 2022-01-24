import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(loginInput: $input) {
            accessToken
        }
    }
`;

export const REFRESH_TOKEN = gql`
    mutation RefreshToken {
        refreshToken {
            accessToken
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;
