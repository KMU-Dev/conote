import { ApolloError, gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { Box, Card, CircularProgress, Container, Hidden, Link, SxProps, Theme, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import { useNotification } from '../../components/Notification';
import routes from '../../constant/routes.json';
import { setAccessToken } from '../../graphql/links/authLink';
import { LOGIN } from '../../graphql/mutations/auth';
import { UI_STATUS } from '../../graphql/queries/uiStatus';
import { AuthPaylaod } from '../../graphql/type/AuthPayload';
import { GraphqlDto } from '../../graphql/type/type';
import { UIStatus } from '../../graphql/type/UIStatus';
import LoginImage from './login_illustration.svg';


const iconSx: SxProps<Theme> = {
    fontSize: '2.5rem',
};

export default function Login() {
    const [realLoading, setRealLoading] = useState(false);
    const history = useHistory();
    const { enqueueNotification } = useNotification();

    const client = useApolloClient();
    const { data, refetch } = useQuery<GraphqlDto<'uiStatus', UIStatus>>(UI_STATUS);
    const [login, { loading }] = useMutation<GraphqlDto<"login", AuthPaylaod>>(LOGIN, {
        update: (cache, { data: { login }}) => {
            cache.writeFragment({
                fragment: gql`
                    fragment CurrentAuthPayload on AuthPayload {
                        accessToken
                    }
                `,
                data: login,
            });
        },
    });

    useEffect(() => {
        if (data && data.uiStatus.user) history.push(routes.HOME);
    }, [data, history]);

    useEffect(() => {
        if (loading) setRealLoading(loading);
    }, [loading]);

    const handleCodeRetrieve = async (code: string) => {
        try {
            const response = await login({ variables: { input: { code } } });
            if (response.data) {
                const accessToken = response.data.login.accessToken;
                setAccessToken(accessToken);

                gtag('event', 'login', { method: 'Google Workspace' });

                await refetch();
                await client.reFetchObservableQueries(true);

                history.push(routes.HOME);
            }
        } catch (e) {
            if (e instanceof ApolloError) {
                enqueueNotification({
                    title: '無法登入',
                    content: e.message,
                    variant: 'error',
                });
            } else console.error(e);
            setRealLoading(false);
        }
    }

    return (
        <Box display="flex" height={1}>
            <Hidden mdDown>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: 1,
                        maxWidth: 464,
                        mt: 4,
                        ml: 4,
                        borderRadius: 4,
                        boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
                        overflow: 'none',
                    }}
                >
                    <Box px={12}>
                        <RouterLink to={routes.HOME}>
                            <LocalLibraryOutlinedIcon color="primary" sx={iconSx} />
                        </RouterLink>
                    </Box>
                    <Typography variant="h3" my={30} px={10} fontSize="1.875rem">歡迎回來</Typography>
                    <Box component="img" src={LoginImage} alt="Login" px={4} />
                </Card>
            </Hidden>
            <Container maxWidth="sm" sx={{ height: 1, p: { xs: 4, sm: 6 } }}>
                <Box display="flex" flexDirection="column" justifyContent="center" height={1}>
                    <Hidden mdUp>
                        <Box p={2} mb={4}>
                            <RouterLink to={routes.HOME}>
                                <LocalLibraryOutlinedIcon color="primary" sx={iconSx} />
                            </RouterLink>
                        </Box>
                    </Hidden>
                    <Box>
                        <Typography variant="h4" mb={2} fontSize="h5.fontSize" lineHeight={1.5}>登入</Typography>
                        <Typography variant="body1" color="text.secondary">使用你的 Conote 帳號</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" my={12}>
                        {realLoading ?
                            <CircularProgress /> :
                            <GoogleLoginButton onCodeRetrieve={handleCodeRetrieve} />
                        }
                    </Box>
                    <Typography variant="body2" mb={10} color="text.secondary">
                        當您登入 Conote，即代表你同意遵守我們的條款，包含&ensp;
                        <Link to={routes.TERMS_OF_SERVICE} color="primary" component={RouterLink} underline="hover">使用者服務條款</Link>
                        &ensp;及&ensp;
                        <Link to="/privacy" color="primary" component={RouterLink} underline="hover">隱私權政策</Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
