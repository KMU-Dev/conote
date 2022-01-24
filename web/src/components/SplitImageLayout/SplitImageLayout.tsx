import clsx from 'clsx';
import { Box, Grid } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { ReactNode } from "react";

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
    }),
);

export default function SplitImageLayout(props: SplitImageLayoutProps) {
    const { children, image, alt } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item xs={12} md={6} className={classes.imageGrid}>
                    <img src={image} alt={alt} className={classes.img} />
                </Grid>
                <Grid item xs={12} md={6} className={clsx(classes.textGrid, props.classes?.textGrid)}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
}

interface Classes {
    textGrid?: string;
}

interface SplitImageLayoutProps {
    children: ReactNode;
    image: string;
    alt: string;
    classes?: Classes;
}
