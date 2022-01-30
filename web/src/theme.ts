import { pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

let defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#4F46E5',
        },
        secondary: pink,
        background: {
            default: '#fafafa', // Material UI default background color
        },
    },
    typography: {
        fontFamily: [
            'Noto Sans TC',
            'sans-serif',
        ].join(','),
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
});

defaultTheme = createTheme(defaultTheme, {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: defaultTheme.palette.secondary.main,
                },
            },
        },
    },
});

export default defaultTheme;
