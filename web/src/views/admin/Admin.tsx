import { Box, Hidden } from '@mui/material';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom-v5-compat';
import { getHeaderDef } from '../../components/Header';
import AdminMenu from './AdminMenu';


export default function Admin() {
    const headerDef = useMemo(() => getHeaderDef(), []);

    return (
        <Box display="flex" height={1} minHeight={1}>
            <Hidden mdDown>
                <AdminMenu menu={headerDef.admin} />
            </Hidden>
            <Box flexGrow={1} maxWidth={{ xs: 1, md: 'calc(100% - 260px)' }}>
                <Outlet />
            </Box>
        </Box>
    );
}
