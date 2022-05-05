import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

export default function CentralProgress() {
    return (
        <Grid container justifyContent="center" alignItems="center" height={1} minHeight={1}>
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    );
}