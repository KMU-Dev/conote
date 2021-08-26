import clsx from 'clsx';
import { Box, BoxProps, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            minHeight: '100%',
            padding: theme.spacing(6, 4),
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(6, 6),
            },
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(8, 8),
            },
        },
    }),
);

export default function AppLayout(props: AppLayoutProps) {
    const { className } = props;
    const classes = useStyles();

    return <Box {...props} className={clsx(classes.root, className)} />;
}

interface AppLayoutProps extends BoxProps {}
