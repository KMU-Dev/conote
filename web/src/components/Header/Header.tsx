import { Box, IconButton, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ReactNode } from "react";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Drawer } from '../Drawer';
import { HeaderDefinition } from "./HeaderDefinition";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideocamIcon from '@material-ui/icons/Videocam';
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
            display: 'flex',
            alignItems: 'center',
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
        iconButton: {
            padding: theme.spacing(0),
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
    })
);

export default function Header(props: HeaderProps) {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && 
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    }

    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Box className={classes.leftBox}>
                    <LocalLibraryOutlinedIcon color="primary" />
                    <Typography variant="h4" className={classes.title}>Conote</Typography>
                </Box>
                <Box className={classes.rightBox}>
                    <IconButton
                        aria-label="menu"
                        className={classes.iconButton + " " + classes.menuButton}
                        onClick={toggleDrawer(!drawerOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton aria-label="account" className={classes.iconButton}>
                        <AccountCircleOutlinedIcon />
                    </IconButton>
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
