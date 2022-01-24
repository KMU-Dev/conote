import { Box } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { MTableToolbar } from "material-table";

const useStyles = makeStyles(theme =>
    createStyles({
        outlinedSearchPadding: {
            padding: theme.spacing(2, 0),
        },
    }),
);

export default function TableToolbar(props: any) {
    const variant: SearchFieldVariant = props.searchFieldVariant;
    const classes = useStyles();

    if (variant === 'outlined') return (
        <Box className={classes.outlinedSearchPadding}>
            <MTableToolbar {...props} />
        </Box>
    )

    return <MTableToolbar {...props} />;
}

type SearchFieldVariant = "standard" | "filled" | "outlined";
