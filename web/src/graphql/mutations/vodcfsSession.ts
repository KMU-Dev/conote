import { gql } from "@apollo/client";

export const CREATE_VODCFS_SESSION = gql`
    mutation createVodcfsSession {
        createVodcfsSession {
            id
            captcha
        }
    }
`;
