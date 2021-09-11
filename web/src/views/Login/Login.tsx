import { Box, Container, Typography, Link, Hidden, Card, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import LoginImage from './login_illustration.svg';
import routes from '../../constant/routes.json';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import { useMutation, gql, useQuery } from '@apollo/client';
import { AuthPaylaod } from '../../graphql/type/AuthPayload';
import { LOGIN } from '../../graphql/mutations/auth';
import { GraphqlDto } from '../../graphql/type/type';
import { UIStatus } from '../../graphql/type/UIStatus';
import { UI_STATUS } from '../../graphql/queries/uiStatus';
import { useEffect, useState } from 'react';
import { setAccessToken } from '../../graphql/links/authLink';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            display: 'flex',
        },
        card: {
            width: '100%',
            maxWidth: '464px',
            margin: theme.spacing(4, 0, 0, 4),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
            borderRadius: theme.spacing(4),
            overflow: 'none',
        },
        cardIconBox: {
            padding: theme.spacing(0, 12),
        },
        cardTitle: {
            margin: theme.spacing(30, 0),
            padding: theme.spacing(0, 10),
            fontSize: '1.875rem',
        },
        cardImage: {
            padding: theme.spacing(0, 4),
        },
        container: {
            height: '100%',
            padding: theme.spacing(4),
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(6),
            }
        },
        header: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(4),
        },
        icon: {
            fontSize: '2.5rem',
        },
        title: {
            marginBottom: theme.spacing(2),
            fontSize: '1.5rem',
            lineHeight: 1.5,
        },
        greyText: {
            color: theme.palette.text.secondary,
        },
        loginBox: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
        },
        buttonBox: {
            margin: theme.spacing(12, 0),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        bold: {
            fontWeight: 'bold',
        },
        terms: {
            marginBottom: theme.spacing(10),
        },
    }),
);

export default function Login() {
    const classes = useStyles();

    const [realLoading, setRealLoading] = useState(false);
    const history = useHistory();

    const { data, refetch } = useQuery<GraphqlDto<'uiStatus', UIStatus>>(UI_STATUS, { fetchPolicy: 'network-only', nextFetchPolicy: 'network-only' });
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

                await refetch();

                history.push(routes.HOME);
            }
        } catch (e) {
            console.error(e);
            setRealLoading(false);
        }
    }

    return (
        <Box className={classes.root}>
            <Hidden smDown>
                <Card className={classes.card}>
                    <Box className={classes.cardIconBox}>
                        <RouterLink to={routes.HOME}>
                            <LocalLibraryOutlinedIcon color="primary" className={classes.icon} />
                        </RouterLink>
                    </Box>
                    <Typography variant="h3" className={classes.cardTitle}>歡迎回來</Typography>
                    <img src={LoginImage} alt="Login" className={classes.cardImage} />
                </Card>
            </Hidden>
            <Container maxWidth="sm" className={classes.container}>
                <Box className={classes.loginBox}>
                    <Hidden mdUp>
                        <Box className={classes.header}>
                            <RouterLink to={routes.HOME}>
                                <LocalLibraryOutlinedIcon color="primary" className={classes.icon} />
                            </RouterLink>
                        </Box>
                    </Hidden>
                    <Box>
                        <Typography variant="h4" className={classes.title}>登入</Typography>
                        <Typography variant="body1" className={classes.greyText}>使用你的 Conote 帳號</Typography>
                    </Box>
                    <Box className={classes.buttonBox}>
                        {realLoading ?
                            <CircularProgress /> :
                            <GoogleLoginButton onCodeRetrieve={handleCodeRetrieve} />
                        }
                    </Box>
                    <Typography variant="body2" className={classes.greyText + " " + classes.terms}>
                        當您登入 Conote，即代表你同意遵守我們的條款，包含&ensp;
                        <Link to="/tos" color="primary" component={RouterLink}>使用者服務條款</Link>
                        &ensp;及&ensp;
                        <Link to="/privacy" color="primary" component={RouterLink}>隱私權政策</Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
