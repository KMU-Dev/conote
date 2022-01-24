import { Button, ButtonProps } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";
import { useEffect } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { generateAuthUrl } from "../../utils/oauth2/google";
import { ReactComponent as Google } from './google.svg';
import oauth2 from "../../constant/oauth2.json";

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
    const { onCodeRetrieve, onError, className, ...restProps } = props;
    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
        if (history.location.search) {
            const params = new URLSearchParams(history.location.search);
            const hd = params.get('hd');
            const code = params.get('code');

            history.replace(history.location.pathname);
            if (hd === oauth2.google.hd && code) {
                onCodeRetrieve(code);
            } else {
                if (onError) onError();
            }
        }
    }, [history, onCodeRetrieve, onError])

    const handleLoginClick = useCallback(() => {
        const url = generateAuthUrl({
            access_type: 'offline',
            hd: oauth2.google.hd,
            response_type: 'code',
            client_id: oauth2.google.clientId,
            redirect_uri: window.location.href,
            scope: oauth2.google.scopes,
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

interface LoginButtonProps extends ButtonProps {
    onCodeRetrieve: (code: string) => void;
    onError?: () => void;
}
