import { pink } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#4F46E5',
        },
        secondary: pink
    },
    typography: {
        fontFamily: [
            'Noto Sans TC',
            'sans-serif',
        ].join(','),
    },
    spacing: factor => `${0.25 * factor}rem`,
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
            }
        }
    }
});

export default defaultTheme;
