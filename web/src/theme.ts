import { pink } from "@material-ui/core/colors";
import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

const defaultPalette = createPalette({
    primary: {
        main: '#4F46E5',
    },
    secondary: pink
});

const defaultTheme = createTheme({
    palette: defaultPalette,
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
        },
        MuiInputLabel: {
            asterisk: {
                color: defaultPalette.secondary.main,
            }
        }
    }
});

export default defaultTheme;
