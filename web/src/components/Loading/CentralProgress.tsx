import { CircularProgress, Grid } from "@mui/material";

export default function CentralProgress() {
    return (
        <Grid container justifyContent="center" alignItems="center" height={1} minHeight={1}>
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    );
}