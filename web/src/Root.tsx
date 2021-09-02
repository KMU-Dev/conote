import { ApolloClient, ApolloProvider, from, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { errorLink } from "./graphql/links/ErrorLink";
import { httpLink } from "./graphql/links/HttpLink";
import defaultTheme from "./theme";

const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
});

export default function Root() {
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={defaultTheme}>
                    <App />
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}
