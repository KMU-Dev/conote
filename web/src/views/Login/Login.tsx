import { Box, Button, Container, Typography, Link, Hidden, Card } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Google } from './google.svg';
import LoginImage from './login_illustration.svg';
import routes from '../../constant/routes.json';

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
        },
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
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth={true}
                            startIcon={<Google className={classes.google} />}
                            classes={{
                                label: classes.buttonLabel,
                            }}
                            className={classes.button}
                        >
                            <span className={classes.flexGrow}>以 @gap.kmu.edu.tw 登入</span>
                        </Button>
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
