import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import defaultTheme from "./theme";

const client = new ApolloClient({
    uri: `${window.location.origin}/graphql`,
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
