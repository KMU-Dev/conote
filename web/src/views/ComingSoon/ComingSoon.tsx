import { Box, Button, createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import CountDownTimer from "../../components/CountDownTimer/CountDownTimer";
import UnderConstruction from './under_construction.svg';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            minHeight: '100%',
            padding: theme.spacing(8, 4),
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(12, 4),
            },
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(16, 4),
            },
        },
        grid: {
            minHeight: '100%',
            justifyContent: 'center',
            alignContent: 'center',
        },
        imageGrid: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(0, 6, 0, 0),
            },
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(0, 18, 0, 0),
            },
        },
        textGrid: {
            maxWidth: `${theme.breakpoints.values.sm}px`,
            padding: theme.spacing(12, 0),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(12, 6),
            },
        },
        img: {
            width: '100%',
            maxWidth: '500px',
            padding: theme.spacing(4),
            [theme.breakpoints.up('md')]: {
                maxWidth: 'unset',
            },
        },
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
        <Box className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item xs={12} md={6} className={classes.imageGrid}>
                    <img src={UnderConstruction} alt="Coming soon" className={classes.img} />
                </Grid>
                <Grid item xs={12} md={6} className={classes.textGrid}>
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
                </Grid>
            </Grid>
        </Box>
    );
}

interface ComingSoonProps {
    time: Date;
}
