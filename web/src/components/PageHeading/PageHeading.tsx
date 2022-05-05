import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import HeadingBreadcrumb from "./HeadingBreadcrumb";


export default function PageHeading(props: PageHeadingProps) {
    const { title, breadcrumb, children } = props;

    return (
        <>
            {breadcrumb ? <HeadingBreadcrumb path={breadcrumb} sx={{ mb: 2 }} /> : ''}
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5" fontSize={{ sm: '1.875rem' }}>{title}</Typography>
                </Grid>
                <Grid item>
                    {children}
                </Grid>
            </Grid>
        </>
    );
}

interface PageHeadingProps {
    title: string;
    breadcrumb?: string;
    children?: ReactNode;
}
