import { Box, Button, Container, Typography, Link } from '@material-ui/core';
import { grey, common } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Google } from './google.svg';

const useStyles = makeStyles(theme =>
    createStyles({
        container: {
            height: '100%',
            padding: theme.spacing(4),
        },
        header: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(4),
        },
        icon: {
            fontSize: '2.5rem',
        },
        titleBox: {
            marginBottom: theme.spacing(10),
        },
        title: {
            marginBottom: theme.spacing(2),
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        greyText: {
            color: grey[600],
        },
        loginBox: {
            display: 'flex',
            // alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
        },
        button: {
            backgroundColor: common.white,
            color: grey[600],
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
            margin: theme.spacing(10, 0),
        },
    }),
);

export default function Login() {
    const classes = useStyles();

    return (
        <>
            <Container maxWidth="sm" className={classes.container}>
                <Box className={classes.loginBox}>
                    <Box className={classes.header}>
                        <LocalLibraryOutlinedIcon color="primary" className={classes.icon} />
                    </Box>
                    <Box className={classes.titleBox}>
                        <Typography variant="h4" className={classes.title}>登入</Typography>
                        <Typography variant="body1" className={classes.greyText}>使用你的 Conote 帳號</Typography>
                    </Box>
                    <Box>
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
                        當您登入 Conote，即代表你同意遵守我們的條款，包含
                        <Link to="/tos" color="primary" component={RouterLink}>使用者服務條款</Link>
                        及
                        <Link to="/privacy" color="primary" component={RouterLink}>隱私權政策</Link>
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
