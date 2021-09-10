import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { client } from "./graphql/client";

import defaultTheme from "./theme";

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
