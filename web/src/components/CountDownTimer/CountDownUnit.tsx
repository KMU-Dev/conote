import { Box, Typography } from "@mui/material";
import { DateUnit, getLocalizedDateUnit, readableDateDiff } from "../../utils/date";


export default function CountDownUnit(props: CountDownUnitProps) {
    const { timeDiff, unit } = props;

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" color="primary" fontWeight="bold">
                {readableDateDiff(timeDiff, unit)}
            </Typography>
            <Typography variant="body1" color="textSecondary">{getLocalizedDateUnit(unit)}</Typography>
        </Box>
    )
}

interface CountDownUnitProps {
    timeDiff: number;
    unit: DateUnit;
}