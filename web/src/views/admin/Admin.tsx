import { Box, Hidden } from '@mui/material';
import { useLayoutEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getHeaderDef } from '../../components/Header';
import { CentralProgress } from '../../components/Loading';
import routes from '../../constant/routes.json';
import { useUIStatus } from '../../graphql/hooks/useUIStatus';
import { UserRole } from '../../graphql/type/user';
import AdminMenu from './AdminMenu';


export default function Admin() {
    let { user, loading } = useUIStatus();
    const location = useLocation();
    const navigate = useNavigate();

    const headerDef = useMemo(() => getHeaderDef(), []);

    // replace to HOME if user is not admin
    useLayoutEffect(() => {
        if (!loading && user?.role !== UserRole.ADMIN) {
            navigate(routes.HOME, { replace: true, state: location.pathname });
        }
    }, [loading, location.pathname, navigate, user?.role]);

    if (loading) return <CentralProgress />;
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
