import { ThemeProvider } from "@material-ui/core";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import defaultTheme from "./theme";

export default function Root() {
    return (
        <HelmetProvider>
            <ThemeProvider theme={defaultTheme}>
                <App />
            </ThemeProvider>
        </HelmetProvider>
    );
}
