import { Button, Typography } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from "react-router-dom";
import SplitImageLayout from "../../components/SplitImageLayout/SplitImageLayout";
import PageNotFound from './page_not_found.svg';
import routes from '../../constant/routes.json';

const useStyles = makeStyles(theme =>
    createStyles({
        textGrid: {
            [theme.breakpoints.up('md')]: {
                textAlign: 'unset',
            },
        },
        title: {
            marginBottom: theme.spacing(3),
        },
        countDownBox: {
            width: '100%',
            margin: theme.spacing(4, 0),
        },
        button: {
            marginTop: theme.spacing(8),
        }
    }),
);

export default function NotFound() {
    const classes = useStyles();

    return (
        <SplitImageLayout image={PageNotFound} alt="Not found" classes={{textGrid: classes.textGrid}}>
            <Typography variant="h1" className={classes.title}>404</Typography>
            <Typography variant="h6" color="textSecondary">
                糟糕！看起來您點到壞掉的連結了，
                <br />
                如果您覺得相當不尋常，請告訴我們。
            </Typography>
            <Button
                variant="contained"
                size="large"
                color="primary"
                to={routes.HOME}
                className={classes.button}
                component={Link}
            >
                回到首頁
            </Button>
        </SplitImageLayout>
    );
}
