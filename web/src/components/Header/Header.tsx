import clsx from 'clsx';
import { Box, Hidden, IconButton, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { ReactNode } from "react";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Drawer } from '../Drawer';
import { HeaderDefinition } from "./HeaderDefinition";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideocamIcon from '@material-ui/icons/Videocam';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { useState } from "react";

const headerDef: HeaderDefinition[] = [
    { name: '總覽', href: '/', icon: <DashboardIcon />  },
    { name: '影片', href: '/videos', icon: <VideocamIcon /> },
]

const useStyles = makeStyles(theme =>
    createStyles({
        toolbar: {
            padding: theme.spacing(0, 4),
            justifyContent: 'space-between',
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(0, 6),
            }
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
        title: {
            margin: theme.spacing(0, 2),
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        tabs: {
            minHeight: '100%',
        },
        tabsFlexContainer: {
            minHeight: '100%',
        },
        tab: {
            minWidth: '72px',
            margin: theme.spacing(0, 2),
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

    const [drawerOpen, setDrawerOpen] = useState(false);

    const getTabs = (defs: HeaderDefinition[]) => defs.map((def) =>(
        <Tab label={def.name} href={def.href} className={classes.tab} onClick={handleTabClick} />
    ))

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && 
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    }

    const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Box className={classes.leftBox}>
                    <LocalLibraryOutlinedIcon color="primary" />
                    <Typography variant="h4" className={classes.title}>Conote</Typography>
                    <Tabs
                        value={0}
                        indicatorColor="primary"
                        aria-label="navigation tabs"
                        classes={{flexContainer: classes.tabsFlexContainer}}
                        className={classes.tabs}
                    >
                        {getTabs(headerDef)}
                    </Tabs>
                </Box>
                <Box className={classes.rightBox}>
                    <IconButton
                        aria-label="menu"
                        className={clsx(classes.iconButton, classes.iconButtonMargin)}
                        onClick={toggleDrawer(!drawerOpen)}
                    >
                        <MenuIcon className={classes.iconButtonIcon} />
                    </IconButton>
                    <IconButton aria-label="account" className={clsx(classes.iconButton, classes.iconButtonMargin)}>
                        <AccountCircleOutlinedIcon className={classes.iconButtonIcon} />
                    </IconButton>
                    <Hidden xlDown>
                        <IconButton aria-label="notification" className={classes.iconButton}>
                            <NotificationsOutlinedIcon className={classes.iconButtonIcon} />
                        </IconButton>
                    </Hidden>
                </Box>
            </Toolbar>
            {props.children}
            <Drawer open={drawerOpen} toggleDrawer={toggleDrawer} menu={headerDef} />
        </>
    );
}

interface HeaderProps {
    children: ReactNode;
}
