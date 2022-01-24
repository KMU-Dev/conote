import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    useTheme,
} from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import clsx from "clsx";
import { Fragment, useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { hexToRGBA } from "../../utils/colors";
import { isMatch } from "../../utils/routes";
import { MenuCollapseItemDefinition, MenuItemDefinition, MenuSection } from "../Header";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            padding: theme.spacing(4),
        },
        subheader: {
            padding: theme.spacing(0),
            color: theme.palette.text.primary,
            fontWeight: 500,
            lineHeight: 2.5,
        },
        listItem: {
            padding: theme.spacing(3, 2, 3, 4),
            borderRadius: '16px',
        },
        listItemMatch: {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
        },
        listItemIcon: {
            minWidth: 'unset',
            marginRight: theme.spacing(3),
            [theme.breakpoints.up('sm')]: {
                '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                },
            }
        },
        listItemText: {
            color: theme.palette.grey[700],
            [theme.breakpoints.up('sm')]: {
                fontSize: '0.875rem',
            }
        },
        listItemTextMatch: {
            color: theme.palette.primary.main,
        },
        collapseListItem: {
            padding: theme.spacing(3, 2, 3, 13),
            color: theme.palette.grey[700],
            borderRadius: '16px',
        },
    }),
);

export default function NestedList(props: NestedListProps) {
    const { sections, className } = props;
    const classes = useStyles();

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
            className={clsx(classes.collapseListItem, isMatch(item.href, item.exact) && classes.listItemMatch)}
            component={Link}
            to={item.href}>
            <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                    className: clsx(
                        classes.listItemText,
                        isMatch(item.href, item.exact) && classes.listItemTextMatch
                    )
                }}
            />
        </ListItem>
    )), [classes]);

    const menuItems = useCallback((items: MenuItemDefinition[]) => items.map((item, index) => (
        <Fragment key={item.name}>
            {item.type === 'collapse' ?
                <>
                    <ListItem button onClick={() => handleCollapseClick(index)} className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} primaryTypographyProps={{className: classes.listItemText}} />
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
                    className={clsx(classes.listItem, isMatch(item.href, item.exact) && classes.listItemMatch)}
                    component={Link}
                    to={item.href}
                >
                    <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                    <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                            className: clsx(
                                classes.listItemText,
                                isMatch(item.href, item.exact) && classes.listItemTextMatch
                            )
                        }}
                    />
                </ListItem>
            }
        </Fragment>
    )), [collapseOpens, collapseListItems, handleCollapseClick, classes, theme]);

    return (
        <Box className={clsx(classes.root, className)}>
            {sections.map((section) => (
                <List
                    key={section.id}
                    aria-labelledby={section.id}
                    subheader={
                        <ListSubheader id={section.id} className={classes.subheader}>
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
    className?: string;
}
