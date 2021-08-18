import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { ReactNode } from "react";
import HeadingBreadcrumb from "./HeadingBreadcrumb";

const useStyles = makeStyles(theme =>
    createStyles({
        breadcrumb: {
            marginBottom: theme.spacing(2),
        },
        title: {
            [theme.breakpoints.up('sm')]: {
                fontSize: '1.875rem',
            },
        },
    }),
);

export default function PageHeading(props: PageHeadingProps) {
    const { title, breadcrumb, children } = props;
    const classes = useStyles();

    return (
        <>
            {breadcrumb ? <HeadingBreadcrumb path={breadcrumb} className={classes.breadcrumb} /> : ''}
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5" className={classes.title}>{title}</Typography>
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
