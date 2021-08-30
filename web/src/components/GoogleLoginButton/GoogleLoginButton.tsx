import { Button, ButtonProps, createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useCallback } from "react";
import { generateAuthUrl } from "../../utils/oauth2/google";
import { ReactComponent as Google } from './google.svg';

const useStyles = makeStyles(theme =>
    createStyles({
        button: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.text.secondary,
        },
        buttonLabel: {
            justifyContent: 'unset',
        },
        google: {
            width: '18px',
            height: '18px',
            marginRight: theme.spacing(6),
        },
        flexGrow: {
            flexGrow: 2,
        },
    }),
);

export default function GoogleLoginButton(props: LoginButtonProps) {
    const { className, ...restProps } = props;
    const classes = useStyles();

    const handleLoginClick = useCallback(() => {
        const url = generateAuthUrl({
            access_type: 'offline',
            hd: 'gap.kmu.edu.tw',
            response_type: 'code',
            client_id: '992166578720-rr81tqe327rlsje0ua8so557142stnco.apps.googleusercontent.com',
            redirect_uri: window.location.href,
            scope: ['openid', 'email', 'profile'],
            prompt: 'consent',
        });
        window.location.href = url;
    }, []);

    return (
        <Button
            variant="contained"
            size="large"
            fullWidth={true}
            startIcon={<Google className={classes.google} />}
            classes={{
                label: classes.buttonLabel,
            }}
            className={clsx(classes.button, className)}
            onClick={handleLoginClick}
            {...restProps}
        >
            <span className={classes.flexGrow}>以 @gap.kmu.edu.tw 登入</span>
        </Button>
    );
}

interface LoginButtonProps extends ButtonProps {}
