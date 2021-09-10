import { ApolloLink } from "@apollo/client";
import { history } from "../../utils/history";
import routes from '../../constant/routes.json';
import { getAccessTokenFromCahce } from "../../utils/auth";

let accessToken: string;
const excludedOperation = ['Login', 'UIStatus', 'InitialGoogleLink', 'InitialCreateAdmin'];

export const authLink = new ApolloLink((operation, forward) => {
    if (excludedOperation.includes(operation.operationName)) return forward(operation);

    if (!accessToken) {
        // get accessToken from cache
        const cahceAccessToken = getAccessTokenFromCahce();
        if (cahceAccessToken) accessToken = cahceAccessToken;
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
