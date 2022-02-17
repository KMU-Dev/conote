import { gql } from "@apollo/client";

export const CREATE_VODCFS_SESSION = gql`
    mutation createVodcfsSession {
        createVodcfsSession {
            id
            captcha
        }
    }
`;

export const AUTHENTICATE_VODCFS_SESSION = gql`
    mutation authenticateVodcfsSession ($input: AuthenticateVodcfsSessionInput!) {
        authenticateVodcfsSession (input: $input) {
            id
            status
            errorReason
        }
    }
`;
