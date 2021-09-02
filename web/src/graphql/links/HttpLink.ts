import { HttpLink } from "@apollo/client";

export const httpLink = new HttpLink({
    uri: `${window.location.origin}/graphql`,
});