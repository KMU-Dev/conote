import { Box, createStyles, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { DateUnit, getTimeDiff } from "../../utils/date";
import CountDownUnit from "./CountDownUnit";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
        },
    }),
);

export default function CountDownTimer(props: CountDownTimerProps) {
    const { time } = props;
    const classes = useStyles();

    const [timeDiff, setTimeDiff] = useState(() => getTimeDiff(time));

    useEffect(() => {
        const id = setInterval(() => {
            setTimeDiff(getTimeDiff(time));
        }, 1000);
        return () => clearInterval(id);
    }, [time]);

    const timeUnits = (['Day', 'Hour', 'Minute', 'Second'] as DateUnit[]).map((unit) => (
        <CountDownUnit key={unit} timeDiff={timeDiff} unit={unit} />
    ));

    return (
        <Box className={classes.root}>
            {timeUnits}
        </Box>
    )
}

interface CountDownTimerProps {
    time: Date
}
