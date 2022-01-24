import { Box, Button, Typography } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import CountDownTimer from "../../components/CountDownTimer/CountDownTimer";
import SplitImageLayout from "../../components/SplitImageLayout/SplitImageLayout";
import UnderConstruction from './under_construction.svg';

const useStyles = makeStyles(theme =>
    createStyles({
        title: {
            marginBottom: theme.spacing(3),
        },
        subtitle: {
            color: theme.palette.text.secondary,
        },
        countDownBox: {
            width: '100%',
            margin: theme.spacing(4, 0),
        },
        button: {
            marginTop: theme.spacing(4),
        }
    }),
);

export default function ComingSoon(props: ComingSoonProps) {
    const { time } = props;
    const classes = useStyles();

    return (
        <SplitImageLayout image={UnderConstruction} alt="Coming soon">
            <Typography variant="h4" className={classes.title}>我們即將推出新功能</Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                我們的網站正在🚧施工🚧，
                <br />
                很快你就會看到令人驚嘆的新功能。
            </Typography>
            <Box className={classes.countDownBox}>
                <CountDownTimer time={time} />
            </Box>
            <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                className={classes.button}
            >
                推出時通知我
            </Button>
        </SplitImageLayout>
    );
}

interface ComingSoonProps {
    time: Date;
}
