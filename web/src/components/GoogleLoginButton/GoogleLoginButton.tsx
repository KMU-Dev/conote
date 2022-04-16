import { Box, Button, ButtonProps } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import oauth2 from "../../constant/oauth2.json";
import { generateAuthUrl } from "../../utils/oauth2/google";
import { ReactComponent as Google } from './google.svg';

export default function GoogleLoginButton(props: LoginButtonProps) {
    const { onCodeRetrieve, onError, sx, ...restProps } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const didEffectRun = useRef(false);

    useEffect(() => {
        if (searchParams.has('code') && didEffectRun.current === false) {
            didEffectRun.current = true;

            const hd = searchParams.get('hd');
            const code = searchParams.get('code');

            setSearchParams({}, { replace: true });
            if (hd === oauth2.google.hd && code) {
                onCodeRetrieve(code);
            } else {
                if (onError) onError();
            }
        }
    }, [navigate, onCodeRetrieve, onError, searchParams, setSearchParams]);

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
