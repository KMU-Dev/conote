import { Avatar, Box, Paper, Typography } from "@mui/material";
import { MenuSection } from "../../components/Header";
import NestedList from "../../components/NestedList/NestedList";


export default function AdminMenu(props: AdminMenuProps) {
    const { menu } = props;

    return (
        <Paper elevation={0} sx={{ width: 260 }}>
            <Box p={4}>
                <Box
                    display="flex"
                    alignItems="center"
                    p={4}
                    bgcolor={(theme) => theme.palette.grey[100]}
                    borderRadius={4}
                >
                    <Avatar />
                    <Box ml={4}>
                        <Typography variant="subtitle2">趙子賢</Typography>
                        <Typography variant="body2" color="textSecondary">系統管理員</Typography>
                    </Box>
                </Box>
            </Box>
            <NestedList sections={menu} sx={{ pt: 2 }} />
        </Paper>
    );
}

interface AdminMenuProps {
    menu: MenuSection[];
}