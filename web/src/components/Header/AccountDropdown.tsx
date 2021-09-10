import { Menu, MenuItem, MenuProps, ListItemIcon, ListItemText, makeStyles, createStyles, Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PartialBy } from '../../utils/types';
import { MenuDefinition } from './MenuDefinition';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
            [theme.breakpoints.up('sm')]: {
                marginTop: theme.spacing(5),
            },
        },
        accountInfo: {
            minWidth: '200px',
            padding: theme.spacing(2, 4, 4, 4),
        },
        title: {
            fontWeight: 500,
            fontSize: '1.125rem',
        },
        subtitle: {
            marginTop: theme.spacing(1),
        },
        listItem: {
            '&:hover .MuiListItemIcon-root': {
                color: theme.palette.primary.main,
            },
        },
    }),
);

const getMenuItems = (
    menuDefs: AccountMenuDefinition[],
    classes: ReturnType<typeof useStyles>,
    onMenuItemClick?: MenuItemClickCallback
) => menuDefs.map((def, index) => (
    <MenuItem key={def.name} className={classes.listItem} component={def.href && Link} to={def.href} onClick={() => onMenuItemClick(index)}>
        <ListItemIcon>
            {def.icon}
        </ListItemIcon>
        <ListItemText color="secondary">{def.name}</ListItemText>
    </MenuItem>
));

export default function AccountDropdown(props: AccountDropdownProps) {
    const { menuDefinitions, onMenuItemClick, ...menuProps } = props;
    const classes = useStyles();

    const menuItems = useMemo(() =>
        getMenuItems(menuDefinitions, classes, onMenuItemClick),
        [menuDefinitions, classes, onMenuItemClick]
    );

    return (
        <Menu
            {...menuProps}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            getContentAnchorEl={null}
            className={clsx(classes.root, props.className)}
        >
            <Box className={classes.accountInfo}>
                <Typography variant="h6">趙子賢</Typography>
                <Typography variant="body2" color="textSecondary">
                    u108001058
                </Typography>
            </Box>
            {menuItems}
        </Menu>
    )
}

export interface AccountMenuDefinition extends PartialBy<MenuDefinition, 'href' | 'exact'> {}

export interface AccountDropdownProps extends MenuProps {
    id: string;
    menuDefinitions: AccountMenuDefinition[];
    onMenuItemClick?: MenuItemClickCallback;
}

type MenuItemClickCallback = (index: number) => void;
