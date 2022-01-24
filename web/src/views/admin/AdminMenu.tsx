import { Avatar, Box, Paper, Typography } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { MenuSection } from "../../components/Header";
import NestedList from "../../components/NestedList/NestedList";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '260px',
        },
        infoBox: {
            padding: theme.spacing(4),
        },
        avatarBox: {
            padding: theme.spacing(4),
            borderRadius: theme.spacing(4),
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.grey[100],
        },
        infoTextBox: {
            marginLeft: theme.spacing(4),
        },
        list: {
            paddingTop: theme.spacing(2),
        },
    }),
);

export default function AdminMenu(props: AdminMenuProps) {
    const { menu } = props;
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root}>
            <Box className={classes.infoBox}>
                <Box className={classes.avatarBox}>
                    <Avatar />
                    <Box className={classes.infoTextBox}>
                        <Typography variant="subtitle2">趙子賢</Typography>
                        <Typography variant="body2" color="textSecondary">系統管理員</Typography>
                    </Box>
                </Box>
            </Box>
            <NestedList sections={menu} className={classes.list} />
        </Paper>
    );
}

interface AdminMenuProps {
    menu: MenuSection[];
}