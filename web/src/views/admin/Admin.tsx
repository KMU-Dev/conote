import { Box, createStyles, Hidden, makeStyles } from '@material-ui/core';
import { headerDef } from '../../components/Header';
import AdminMenu from './AdminMenu';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            height: '100%',
            minHeight: '100%',
        }
    }),
);

export default function Admin() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Hidden smDown>
                <AdminMenu menu={headerDef.admin} />
            </Hidden>
        </Box>
    );
}
