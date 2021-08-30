import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { StepContentProps } from "./StepContentProps";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            padding: theme.spacing(2, 6),
        },
        image: {
            width: '100%',
            maxHeight: '220px',
            padding: theme.spacing(6),
        },
        titleBox: {
            marginTop: theme.spacing(6),
        },
        title: {
            marginBottom: theme.spacing(2),
            fontSize: '1.5rem',
            lineHeight: 1.5,
        },
        button: {
            margin: theme.spacing(12, 0),
        },
        subtitle: {
            marginBottom: theme.spacing(6),
        }
    }),
);

export default function LinkGoogle(props: StepContentProps) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h4" className={classes.title}>綁定 Google 帳號</Typography>
                <Typography variant="body1" color="textSecondary">目前僅支援高雄醫學大學 Google Workspace 帳號</Typography>
            </Box>
            <GoogleLoginButton className={classes.button} />
            <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
                此 Google 帳號將會作為您未來登入用的帳號，因此請您牢記登入資訊。
            </Typography>
        </Box>
    );
}
