import { Box, Hidden } from '@mui/material';
import { useMemo } from 'react';
import { Switch } from 'react-router-dom';
import { getHeaderDef } from '../../components/Header';
import PageRoute from '../../components/Page/PageRoute';
import routes from '../../constant/routes.json';
import AdminMenu from './AdminMenu';
import UserList from './UserList/UserList';


export default function Admin() {
    const headerDef = useMemo(() => getHeaderDef(), []);

    return (
        <Box display="flex" height={1} minHeight={1}>
            <Hidden mdDown>
                <AdminMenu menu={headerDef.admin} />
            </Hidden>
            <Box flexGrow={1} maxWidth={{ xs: 1, md: 'calc(100% - 260px)' }}>
                <Switch>
                    <PageRoute exact path={routes.ADMIN_USER_LIST} component={UserList} title="使用者清單" />
                </Switch>
            </Box>
        </Box>
    );
}
