import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { client } from "./graphql/client";
import defaultTheme from "./theme";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
