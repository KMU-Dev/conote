import { pink } from "@mui/material/colors";
import {
    unstable_createMuiStrictModeTheme as createTheme,
    adaptV4Theme,
} from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";

const defaultPalette = createPalette({
    primary: {
        main: '#4F46E5',
    },
    secondary: pink
});

const defaultTheme = createTheme(adaptV4Theme({
    palette: defaultPalette,
    typography: {
        fontFamily: [
            'Noto Sans TC',
            'sans-serif',
        ].join(','),
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
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
}));

export default defaultTheme;
