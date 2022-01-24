import { Box, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useLocation } from "react-router-dom";
import clsx from 'clsx';
import { MenuDefinition } from "../Header/MenuDefinition";
import { hexToRGBA } from "../../utils/colors";
import { isMatch } from "../../utils/routes";
import { useState } from "react";
import { useRef } from "react";
import { DrawerVariant } from "./types";
import DrawerInfoPanel from "./DrawerInfoPanel";
import { useEffect } from "react";
import { useCallback } from "react";
import { HeaderDefinition } from "../Header/HeaderDefinition";
import NestedList from "../NestedList/NestedList";


const useStyles = makeStyles(theme =>
    createStyles({
        list: {
            width: '260px',
        },
        listItem: {
            color: theme.palette.action.active,
        },
        listItemMatch: {
            color: theme.palette.primary.main,
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
        },
        listItemIcon: {
            minWidth: 'auto',
            marginRight: theme.spacing(4),
            color: 'inherit',
        },
    })
);

export default function Drawer(props: DrawerProps) {
    const { open, toggleDrawer, menu } = props;
    const classes = useStyles();

    const getVariant = useCallback(() => isMatch('/admin', false) ? 'admin' : 'default', []);
    const [variant, setVariant] = useState<DrawerVariant>(getVariant());
    const location = useLocation();
    const goBackLink = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        setVariant(getVariant());
        toggleDrawer(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const listItems = (menuDef: MenuDefinition[]) => menuDef.map((def) => (
        <ListItem
            button
            key={def.name}
            to={def.href}
            component={Link}
            className={clsx(classes.listItem, isMatch(def.href, def.exact) && classes.listItemMatch)}
        >
            <ListItemIcon className={classes.listItemIcon}>{def.icon}</ListItemIcon>
            <ListItemText primary={def.name} />
        </ListItem>
    ));

    const handleDrawerEvent = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && 
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        toggleDrawer(open);
    }

    /* const handlePresentationClick = (e: MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        console.log(e.target);
        if (goBackLink.current && goBackLink.current.contains(target)) return;
        if (target.className.includes('MuiCollapse-root')) return;
        toggleDrawer(false);
    } */

    const handleGoBackClick = () => {
        setVariant('default');
    }

    return (
        <SwipeableDrawer open={open} onOpen={handleDrawerEvent(true)} onClose={handleDrawerEvent(false)}>
            <Box
                role="presentation"
                className={classes.list}
                onKeyDown={handleDrawerEvent(false)}
            >
                <DrawerInfoPanel ref={goBackLink} variant={variant} onGoBackClick={handleGoBackClick} />
                {variant === 'admin' ?
                    <NestedList sections={menu.admin} /> :
                    <List>{listItems(menu.navigation)}</List>
                }
            </Box>
        </SwipeableDrawer>
    );
}

interface DrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    menu: HeaderDefinition;
}
