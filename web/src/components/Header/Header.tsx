import clsx from 'clsx';
import { Box, Divider, Hidden, IconButton, List, ListItemText, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { MouseEvent, ReactNode } from "react";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Drawer } from '../Drawer';
import { headerDef, HeaderDefinition } from "./HeaderDefinition";
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { useState } from "react";
import ListItemLink from '../ListItemLink/ListItemLink';
import { isMatch, useRenderLink } from '../../utils/routes';
import routes from '../../constant/routes.json';
import { useRef } from 'react';
import AccountDropdown from './AccountDropdown';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../../graphql/mutations/auth';
import { GraphqlDto } from '../../graphql/type/type';
import { useNotification } from '../Notification';
import { history } from '../../utils/history';
import { client } from '../../graphql/client';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        toolbar: {
            padding: theme.spacing(0, 4),
            justifyContent: 'space-between',
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(0, 6),
            },
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(0, 8),
            },
        },
        main: {
            flex: 1,
            backgroundColor: theme.palette.background.default,
        },
        leftBox: {
            height: theme.mixins.toolbar.minHeight,
            display: 'flex',
            alignItems: 'center',
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
                minHeight: 48,
            },
            [theme.breakpoints.up('sm')]: {
                minHeight: 64,
            }
        },
        rightBox: {
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
        },
        titleBox: {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
        },
        title: {
            margin: theme.spacing(0, 2),
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        buttonList: {
            height: '100%',
            margin: theme.spacing(0, 4),
            padding: theme.spacing(0),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        listLi: {
            height: '100%',
            margin: theme.spacing(0, 4),
        },
        listItem: {
            height: '100%',
            padding: theme.spacing(0, 2),
            color: theme.palette.text.secondary,
            '&:hover': {
                color: theme.palette.text.primary,
            }
        },
        listItemMatch: {
            color: theme.palette.text.primary,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
        iconButton: {
            padding: theme.spacing(0),
        },
        iconButtonMargin: {
            marginLeft: theme.spacing(4),
        },
        iconButtonIcon: {
            fontSize: '1.625rem',
        },
    })
);

export default function Header(props: HeaderProps) {
    const classes = useStyles();
    const renderLink = useRenderLink(routes.HOME);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
    const accountDrowpdownId = useRef('account-dropdown');
    const { enqueueNotification } = useNotification();

    const [logout] = useMutation<GraphqlDto<'logout', boolean>>(LOGOUT);

    const listItems = (def: HeaderDefinition) => def.navigation.map((def) => (
        <li key={def.name} className={clsx(classes.listLi)}>
            <ListItemLink
                to={def.href}
                className={clsx(classes.listItem, isMatch(def.href, def.exact) && classes.listItemMatch)}
            >
                <ListItemText primary={def.name} />
            </ListItemLink>
        </li>
    ));

    const handleAccountBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(e.currentTarget);
    };

    const handleAccountMenuClick = async (index: number) => {
        if (index === 2) {
            // logout
            try {
                const result = await logout();
                if (result.data.logout) {
                    window.localStorage.setItem('logout', `${Date.now()}`);
                    client.resetStore();
                    history.push(routes.LOGIN);
                } else {
                    enqueueNotification({
                        title: '無法登出',
                        content: '如果錯誤持續發生，請聯絡系統管理員',
                        variant: 'error'
                    });
                }
            } catch (e) {}
        }
        setMenuAnchor(null);
    };

    return (
        <Box className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Box className={classes.leftBox}>
                    <Box component={renderLink} className={classes.titleBox}>
                        <LocalLibraryOutlinedIcon color="primary" />
                        <Typography variant="h4" color="primary" className={classes.title}>CONOTE</Typography>
                    </Box>
                    <Hidden smDown>
                        <List className={classes.buttonList}>
                            {listItems(headerDef)}
                        </List>
                    </Hidden>
                </Box>
                <Box className={classes.rightBox}>
                    <Hidden mdUp>
                        <IconButton
                            aria-label="menu"
                            className={clsx(classes.iconButton, classes.iconButtonMargin)}
                            onClick={() => setDrawerOpen(!drawerOpen)}
                        >
                            <MenuIcon className={classes.iconButtonIcon} />
                        </IconButton>
                    </Hidden>
                    <IconButton
                        id={accountDrowpdownId.current}
                        aria-label="account"
                        className={clsx(classes.iconButton, classes.iconButtonMargin)}
                        onClick={handleAccountBtnClick}
                    >
                        <AccountCircleOutlinedIcon className={classes.iconButtonIcon} />
                    </IconButton>
                    <Hidden smDown>
                        <IconButton aria-label="notification" className={classes.iconButton}>
                            <NotificationsOutlinedIcon className={classes.iconButtonIcon} />
                        </IconButton>
                    </Hidden>
                </Box>
            </Toolbar>
            <Divider />
            <main className={classes.main}>
                {props.children}
            </main>
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

interface HeaderProps {
    children: ReactNode;
}
