import { Box, Typography } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { DateUnit, getLocalizedDateUnit, readableDateDiff } from "../../utils/date";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        timeDiff: {
            fontWeight: 'bold',
        },
    })
)

export default function CountDownUnit(props: CountDownUnitProps) {
    const { timeDiff, unit } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="h5" color="primary" className={classes.timeDiff}>
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