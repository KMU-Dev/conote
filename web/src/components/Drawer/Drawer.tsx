import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isMatch } from "../../utils/routes";
import { HeaderDefinition } from "../Header/HeaderDefinition";
import { MenuDefinition } from "../Header/MenuDefinition";
import NestedList from "../NestedList/NestedList";
import DrawerInfoPanel from "./DrawerInfoPanel";
import { DrawerVariant } from "./types";


export default function Drawer(props: DrawerProps) {
    const { open, toggleDrawer, menu } = props;

    const getVariant = useCallback(() => isMatch('/admin/*') ? 'admin' : 'default', []);
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
            component={Link}
            key={def.name}
            to={def.href}
            sx={[
                { color: 'action.active' },
                isMatch(def.href) !== null && {
                    color: 'primary.main',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                },
            ]}
        >
            <ListItemIcon
                sx={{
                    minWidth: 'auto',
                    mr: 4,
                    color: 'inherit',
                }}
            >
                    {def.icon}
            </ListItemIcon>
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
                width={260}
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
