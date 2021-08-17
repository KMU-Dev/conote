import { Box, createStyles, List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from "@material-ui/core";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import { Link, matchPath } from "react-router-dom";
import clsx from 'clsx';
import { DrawerMenuDefinition } from "./DrawerMenuDefinition";
import { hexToRGBA } from "../../utils/colors";


const useStyles = makeStyles(theme =>
    createStyles({
        list: {
            width: '260px',
        },
        iconBox: {
            padding: theme.spacing(5),
        },
        icon: {
            fontSize: '40px',
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

    const isMatch = (path: string) => matchPath(window.location.pathname, { path: path, exact: true });

    const listItems = (menuDef: DrawerMenuDefinition[]) => menuDef.map((def) => (
        <ListItem
            button
            key={def.name}
            to={def.href}
            component={Link}
            className={clsx(classes.listItem, isMatch(def.href) && classes.listItemMatch)}
        >
            <ListItemIcon className={classes.listItemIcon}>{def.icon}</ListItemIcon>
            <ListItemText primary={def.name} />
        </ListItem>
    ));

    return (
        <SwipeableDrawer open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
            <Box
                role="presentation"
                className={classes.list}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <Box className={classes.iconBox}>
                    <LocalLibraryOutlinedIcon color="primary" className={classes.icon} />
                </Box>
                <List>
                    {listItems(menu)}
                </List>
            </Box>
        </SwipeableDrawer>
    );
}

interface DrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    menu: DrawerMenuDefinition[];
}
