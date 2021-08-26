import { Box, createStyles, Hidden, makeStyles } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import { headerDef } from '../../components/Header';
import PageRoute from '../../components/Page/PageRoute';
import AdminMenu from './AdminMenu';
import routes from '../../constant/routes.json';
import UserList from './UserList/UserList';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            height: '100%',
            minHeight: '100%',
        },
        main: {
            flex: 1,
        },
    }),
);

export default function Admin() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Hidden smDown>
                <AdminMenu menu={headerDef.admin} />
            </Hidden>
            <Box className={classes.main}>
                <Switch>
                    <PageRoute exact path={routes.ADMIN_USER_LIST} component={UserList} title="使用者清單" />
                </Switch>
            </Box>
        </Box>
    );
}
