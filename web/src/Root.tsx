import { ApolloProvider } from "@apollo/client";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { client } from "./graphql/client";
import defaultTheme from "./theme";


export default function Root() {
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={defaultTheme}>
                        <App />
                    </ThemeProvider>
                </StyledEngineProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}
