import { ApolloLink, gql } from "@apollo/client";
import { history } from "../../utils/history";
import { client } from "../client";
import { AuthPaylaod } from "../type/AuthPayload";
import routes from '../../constant/routes.json';

let accessToken: string;
const excludedOperation = ['Login'];

export const authLink = new ApolloLink((operation, forward) => {
    if (excludedOperation.includes(operation.operationName)) return forward(operation);

    if (!accessToken) {
        // get accessToken from cache
        const cache = client.readFragment<AuthPaylaod>({
            id: 'AuthPayload:{}',
            fragment: gql`
                fragment CurrentAuthPayload on AuthPayload {
                    accessToken
                }
            `
        });
        if (cache) accessToken = cache.accessToken;
        else history.push(routes.LOGIN);
    }

    if (accessToken) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
    }

    return forward(operation);
});
