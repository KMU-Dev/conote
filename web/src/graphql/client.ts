import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { authLink, setAccessToken } from "./links/authLink";
import { errorLink } from "./links/ErrorLink";
import { httpLink } from "./links/HttpLink";

export const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    user: {
                        merge: () => undefined,
                    },
                },
            },
            AuthPayload: {
                keyFields: [],
            },
            UIStatus: {
                keyFields: [],
            }
        },
    }),
});

client.onResetStore(async () => {
    setAccessToken(undefined);
});
