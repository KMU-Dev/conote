import { gql } from '@apollo/client';
import { client } from '../graphql/client';
import { AuthPaylaod } from '../graphql/type/AuthPayload';

export const getAccessTokenFromCahce = () => {
    const payload = client.readFragment<AuthPaylaod>({
        id: 'AuthPayload:{}',
        fragment: gql`
            fragment CurrentAuthPayload on AuthPayload {
                accessToken
            }
        `
    });
    return payload && payload.accessToken;
}