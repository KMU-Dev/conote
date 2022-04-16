import { useMutation, useQuery } from '@apollo/client';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Box, Divider, Hidden, IconButton, List, ListItemText, Toolbar, Typography } from "@mui/material";
import { MouseEvent, useMemo, useRef, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom-v5-compat';
import routes from '../../constant/routes.json';
import { client } from '../../graphql/client';
import { LOGOUT } from '../../graphql/mutations/auth';
import { UI_STATUS } from "../../graphql/queries/uiStatus";
import { GraphqlDto } from '../../graphql/type/type';
import { UIStatus } from "../../graphql/type/UIStatus";
import { isMatch, useRenderLink } from '../../utils/routes';
import { Drawer } from '../Drawer';
import ListItemLink from '../ListItemLink/ListItemLink';
import { useNotification } from '../Notification';
import AccountDropdown, { AccountMenuDefinition } from './AccountDropdown';
import { getHeaderDef, HeaderDefinition } from "./HeaderDefinition";

export default function Header() {
    const navigate = useNavigate();
    const renderLink = useRenderLink(routes.HOME);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
    const accountDrowpdownId = useRef('account-dropdown');
    const { enqueueNotification } = useNotification();

    const { data } = useQuery<GraphqlDto<'uiStatus', UIStatus>>(UI_STATUS);
    const [logout] = useMutation<GraphqlDto<'logout', boolean>>(LOGOUT);

    const headerDef = useMemo(() => getHeaderDef(data?.uiStatus), [data?.uiStatus]);
    const listItems = (def: HeaderDefinition) => def.navigation.map((def) => (
        <Box
            component="li"
            key={def.name}
            height={1}
            mx={4}
        >
            <ListItemLink
                to={def.href}
                sx={[
                    {
                        height: 1,
                        px: 2,
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.primary',
                        },
                    },
                    isMatch(def.href, def.exact) !== null && {
                        borderBottom: 2,
                        borderColor: 'primary.main',
                        color: 'text.primary'
                    },
                ]}
            >
                <ListItemText primary={def.name} />
            </ListItemLink>
        </Box>
    ));

    const handleAccountBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (data?.uiStatus?.user) setMenuAnchor(e.currentTarget);
        else navigate(routes.LOGIN);
    };

    const handleAccountMenuClick = async (def: AccountMenuDefinition) => {
        if (def.name === '登出') {
            try {
                const result = await logout();
                if (result.data.logout) {
                    window.localStorage.setItem('logout', `${Date.now()}`);
                    await client.resetStore();
                    navigate(routes.LOGIN);
                } else {
                    enqueueNotification({
                        title: '無法登出',
                        content: '如果錯誤持續發生，請聯絡系統管理員',
                        variant: 'error'
                    });
                }
            } catch (e) {}
        } else setMenuAnchor(null);
    };

    return (
        <Box display='flex' flexDirection='column' height={1} minHeight={1}>
            <Toolbar 
                sx={{
                    justifyContent: 'space-between',
                    px: {
                        xs: 4,
                        sm: 6,
                        lg: 8,
                    }
                }}
            >
                <Box
                    display='flex'
                    alignItems='center'
                    height={(theme) => theme.mixins.toolbar.minHeight}
                    minHeight={{ xs: 48, sm: 64 }}
                >
                    <Box
                        component={renderLink}
                        display='flex'
                        alignItems='center'
                        style={{ textDecoration: 'none' }}
                    >
                        <LocalLibraryOutlinedIcon color="primary" />
                        <Typography variant="h4" color="primary" sx={{ mx: 2, fontSize: '1.25rem', fontWeight: 600 }} /*className={classes.title}*/>CONOTE</Typography>
                    </Box>
                    <Hidden mdDown>
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 1,
                                mx: 4,
                                p: 0,
                            }}
                        >
                            {listItems(headerDef)}
                        </List>
                    </Hidden>
                </Box>
                <Box display='flex' flexDirection='row-reverse' alignItems='center'>
                    <Hidden mdUp>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            sx={{ p: 0, ml: 4 }}
                            onClick={() => setDrawerOpen(!drawerOpen)}
                        >
                            <MenuIcon sx={{ fontSize: '1.625rem' }} />
                        </IconButton>
                    </Hidden>
                    <IconButton
                        id={accountDrowpdownId.current}
                        aria-label="account"
                        sx={{ p: 0, ml: 4 }}
                        onClick={handleAccountBtnClick}
                        size="large">
                        <AccountCircleOutlinedIcon sx={{ fontSize: '1.625rem' }} />
                    </IconButton>
                    <Hidden mdDown>
                        <IconButton size="large" aria-label="notification" sx={{ p: 0 }}>
                            <NotificationsOutlinedIcon sx={{ fontSize: '1.625rem' }} />
                        </IconButton>
                    </Hidden>
                </Box>
            </Toolbar>
            <Divider />
            <Box component="main" flexGrow={1} bgcolor='background.default'>
                <Outlet />
            </Box>
            <AccountDropdown
                id={accountDrowpdownId.current}
                menuDefinitions={headerDef.account}
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                keepMounted
                onClose={handleAccountMenuClick}
                onMenuItemClick={handleAccountMenuClick}
            />
            <Drawer open={drawerOpen} toggleDrawer={setDrawerOpen} menu={headerDef} />
        </Box>
    );
}
