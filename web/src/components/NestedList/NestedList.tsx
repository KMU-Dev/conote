import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    alpha, Box,
    Collapse,
    List,
    ListItem,
    ListItemIcon, ListItemIconProps, ListItemText,
    ListSubheader,
    styled,
    SxProps,
    Theme,
    useTheme
} from "@mui/material";
import { Fragment, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { isMatch } from "../../utils/routes";
import { csx } from "../../utils/style";
import { MenuCollapseItemDefinition, MenuItemDefinition, MenuSection } from "../Header";


const listItemSx: SxProps<Theme> = {
    py: 3,
    pr: 2,
    pl: 4,
    borderRadius: 4,
};

const listItemMatchSx: SxProps<Theme> = {
    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:hover': {
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
};

const listItemTextSx: SxProps<Theme> = {
    color: 'grey.700',
    fontSize: {
        sm: '0.875rem'
    },
};

const listItemTextMatchSx: SxProps = {
    color: 'primary.main',
};

const StyledListItemIcon = styled(ListItemIcon)<ListItemIconProps>(({ theme }) => ({
    minWidth: 'unset',
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
        '& .MuiSvgIcon-root': {
            fontSize: '20px',
        },
    },
}));

export default function NestedList(props: NestedListProps) {
    const { sections, sx } = props;

    const [collapseOpens, setCollapseOpens] = useState<boolean[]>([]);
    const theme = useTheme();

    const handleCollapseClick = useCallback((index: number) => {
        const newState = [...collapseOpens];
        newState[index] = !collapseOpens[index];
        setCollapseOpens(newState);
    }, [collapseOpens]);

    const collapseListItems = useCallback((items: MenuCollapseItemDefinition[]) => items.map((item) => (
        <ListItem
            component={Link}
            to={item.href}
            key={item.name}
            button
            sx={csx(
                {
                    py: 3,
                    pr: 2,
                    pl: 13,
                    color: 'grey.700',
                    borderRadius: 4,
                    '& .MuiTouchRipple-child': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                    },
                },
                isMatch(item.href) && listItemMatchSx,
            )}
        >
            <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                    sx: csx(listItemTextSx, isMatch(item.href) !== null && listItemTextMatchSx),
                }}
            />
        </ListItem>
    )), []);

    const menuItems = useCallback((items: MenuItemDefinition[]) => items.map((item, index) => (
        <Fragment key={item.name}>
            {item.type === 'collapse' ?
                <>
                    <ListItem
                        button
                        sx={listItemSx}
                        onClick={() => handleCollapseClick(index)}
                    >
                        <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                        <ListItemText primary={item.name} primaryTypographyProps={{ sx: listItemTextSx }} />
                        {collapseOpens[index] ?
                            <ExpandLess htmlColor={theme.palette.action.active} /> :
                            <ExpandMore htmlColor={theme.palette.action.active} />
                        }
                    </ListItem>
                    <Collapse in={collapseOpens[index]} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            {collapseListItems(item.items)}
                        </List>
                    </Collapse>
                </> :
                <ListItem
                    component={Link}
                    to={item.href}
                    sx={csx(listItemSx, isMatch(item.href) !== null && listItemMatchSx)}
                >
                    <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                    <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                            sx: csx(listItemTextSx, isMatch(item.href) !== null && listItemTextMatchSx),
                        }}
                    />
                </ListItem>
            }
        </Fragment>
    )), [collapseOpens, collapseListItems, handleCollapseClick, theme]);

    return (
        <Box sx={[{ p: 4 }, ...(Array.isArray(sx) ? sx : [sx])]}>
            {sections.map((section) => (
                <List
                    key={section.id}
                    aria-labelledby={section.id}
                    subheader={
                        <ListSubheader
                            id={section.id}
                            sx={{
                                p: 0,
                                color: 'text.primary',
                                fontWeight: 500,
                                lineHeight: 2.5,
                            }}
                        >
                            {section.name}
                        </ListSubheader>
                    }
                >
                    {menuItems(section.items)}
                </List>
            ))}
        </Box>
    )
}

interface NestedListProps {
    sections: MenuSection[];
    sx?: SxProps<Theme>
}
