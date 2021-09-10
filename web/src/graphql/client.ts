import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { authLink } from "./links/authLink";
import { errorLink } from "./links/ErrorLink";
import { httpLink } from "./links/HttpLink";

export const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            AuthPayload: {
                keyFields: [],
            },
            UIStatus: {
                keyFields: [],
            }
        },
    }),
});
