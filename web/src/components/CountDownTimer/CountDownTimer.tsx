import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { DateUnit, getTimeDiff } from "../../utils/date";
import CountDownUnit from "./CountDownUnit";


export default function CountDownTimer(props: CountDownTimerProps) {
    const { time } = props;

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
        <Box display="flex" justifyContent="space-around" width={1}>
            {timeUnits}
        </Box>
    )
}

interface CountDownTimerProps {
    time: Date
}
