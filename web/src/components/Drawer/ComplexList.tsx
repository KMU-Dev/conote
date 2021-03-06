import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { alpha, SxProps, Theme, useTheme } from "@mui/material/styles";
import { Fragment, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { isMatch } from "../../utils/routes";
import { csx } from "../../utils/style";
import { MenuCollapseItemDefinition, MenuItemDefinition, MenuSection } from "../Header/MenuDefinition";


const listItemSx: SxProps<Theme> = {
    py: 3,
    pr: 2,
    pl: 4,
    borderRadius: 16,
};

const listItemMatchSx: SxProps<Theme> = {
    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
};

const listItemTextMatchSx: SxProps<Theme> = {
    color: 'primary.main',
};

export default function ComplexList(props: ComplexListProps) {
    const { sections } = props;

    const [collapseOpens, setCollapseOpens] = useState<boolean[]>([]);
    const theme = useTheme();

    const handleCollapseClick = useCallback((index: number) => {
        const newState = [...collapseOpens];
        newState[index] = !collapseOpens[index];
        setCollapseOpens(newState);
    }, [collapseOpens]);

    const collapseListItems = useCallback((items: MenuCollapseItemDefinition[]) => items.map((item) => (
        <ListItem
            key={item.name}
            button
            component={Link}
            to={item.href}
            sx={csx(
                {
                    py: 3,
                    pr: 2,
                    pl: 13,
                    color: (theme) => theme.palette.grey[700],
                    borderRadius: 16,
                },
                isMatch(item.href) !== null && listItemMatchSx,
            )}
        >
            <ListItemText
                primary={item.name}
                sx={isMatch(item.href) !== null && listItemTextMatchSx}
            />
        </ListItem>
    )), []);

    const menuItems = useCallback((items: MenuItemDefinition[]) => items.map((item, index) => (
        <Fragment key={item.name}>
            {item.type === 'collapse' ?
                <>
                    <ListItem button onClick={() => handleCollapseClick(index)} sx={listItemSx}>
                        <ListItemIcon sx={{ minWidth: 'unset', mr: 3 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} sx={{ color: (theme) => theme.palette.grey[700] }} />
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
                    {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : ''}
                    <ListItemText
                        primary={item.name}
                        sx={isMatch(item.href) !== null && listItemTextMatchSx}
                    />
                </ListItem>
            }
        </Fragment>
    )), [collapseOpens, collapseListItems, handleCollapseClick, theme]);

    return (
        <>
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
                    sx={{ p: 4 }}
                >
                    {menuItems(section.items)}
                </List>
            ))}
        </>
    )
}

export interface ComplexListProps {
    sections: MenuSection[];
}
