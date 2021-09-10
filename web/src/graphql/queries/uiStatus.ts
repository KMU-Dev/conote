import { gql } from '@apollo/client';

export const UI_STATUS = gql`
    query UIStatus {
        uiStatus {
            initialSetup
            user {
                id
                name
                studentId
                role
                status
                picture
            }
        }
    }
`;
