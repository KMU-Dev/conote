import { ApolloClient, ApolloLink, from, InMemoryCache } from "@apollo/client";
import { authLink, setAccessToken } from "./links/authLink";
import { errorLink } from "./links/ErrorLink";
import { uploadLink } from "./links/uploadLink";

export const client = new ApolloClient({
    link: from([errorLink, authLink, uploadLink as unknown as ApolloLink]),
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
