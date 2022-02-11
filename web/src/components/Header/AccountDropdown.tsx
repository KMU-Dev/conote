import { useQuery } from '@apollo/client';
import { Box, ListItemIcon, ListItemText, Menu, MenuItem, MenuProps, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UI_STATUS } from '../../graphql/queries/uiStatus';
import { GraphqlDto } from '../../graphql/type/type';
import { UIStatus } from '../../graphql/type/UIStatus';
import { PartialBy } from '../../utils/types';
import { MenuDefinition } from './MenuDefinition';


const getMenuItems = (
    menuDefs: AccountMenuDefinition[],
    onMenuItemClick?: MenuItemClickCallback
) => menuDefs
    .filter((def) => !def.hidden)
    .map((def) => (
        <MenuItem
            component={def.href && Link}
            to={def.href} key={def.name}
            sx={{
                '& .MuiListItemText-root': {
                    my: 1,
                },
                '&:hover .MuiListItemIcon-root': {
                    color: 'primary.main'
                },
            }}
            onClick={() => onMenuItemClick(def)}
        >
            <ListItemIcon>
                {def.icon}
            </ListItemIcon>
            <ListItemText color="secondary">{def.name}</ListItemText>
        </MenuItem>
    ));

export default function AccountDropdown(props: AccountDropdownProps) {
    const { menuDefinitions, onMenuItemClick, sx, ...menuProps } = props;

    const { data } = useQuery<GraphqlDto<'uiStatus', UIStatus>>(UI_STATUS);
    const user = data && data.uiStatus.user;

    const menuItems = useMemo(() =>
        getMenuItems(menuDefinitions, onMenuItemClick),
        [menuDefinitions, onMenuItemClick]
    );

    return (
        <Menu
            {...menuProps}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={[{ mt: { xs: 4, sm: 5 }}, ...(Array.isArray(sx) ? sx: [sx])]}
        >
            <Box minWidth={200} px={4} pt={2} pb={4}>
                <Typography variant="h6">{user && user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {user && user.studentId}
                </Typography>
            </Box>
            {menuItems}
        </Menu>
    )
}

export interface AccountMenuDefinition extends PartialBy<MenuDefinition, 'href' | 'exact'> {
    hidden?: boolean;
}

export interface AccountDropdownProps extends MenuProps {
    id: string;
    menuDefinitions: AccountMenuDefinition[];
    onMenuItemClick?: MenuItemClickCallback;
}

type MenuItemClickCallback = (def: AccountMenuDefinition) => void;
