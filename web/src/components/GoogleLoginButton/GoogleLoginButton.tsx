import { Box, Button, ButtonProps } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";
import oauth2 from "../../constant/oauth2.json";
import { generateAuthUrl } from "../../utils/oauth2/google";
import { ReactComponent as Google } from './google.svg';

export default function GoogleLoginButton(props: LoginButtonProps) {
    const { onCodeRetrieve, onError, sx, ...restProps } = props;

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.search) {
            const params = new URLSearchParams(location.search);
            const hd = params.get('hd');
            const code = params.get('code');

            navigate(location.pathname, { replace: true });
            if (hd === oauth2.google.hd && code) {
                onCodeRetrieve(code);
            } else {
                if (onError) onError();
            }
        }
    }, [location, navigate, onCodeRetrieve, onError])

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
            startIcon={<Box component={Google} sx={{ width: 18, height: 18, mr: 6 }} />}
            sx={[
                {
                    color: 'text.secondary',
                    bgcolor: 'common.white',
                    ':hover': {
                        backgroundColor: 'white',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            onClick={handleLoginClick}
            {...restProps}
        >
            <span style={{ flexGrow: 2 }}>以 @gap.kmu.edu.tw 登入</span>
        </Button>
    );
}

interface LoginButtonProps extends ButtonProps {
    onCodeRetrieve: (code: string) => void;
    onError?: () => void;
}
