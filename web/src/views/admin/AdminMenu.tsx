import { Box, Paper } from "@mui/material";
import { MenuSection } from "../../components/Header";
import NestedList from "../../components/NestedList/NestedList";
import { SkeletonAvatar } from "../../components/Skeleton";
import SkeletonTypography from "../../components/Skeleton/SkeletonTypography";
import { useUIStatus } from "../../graphql/hooks/useUIStatus";


export default function AdminMenu(props: AdminMenuProps) {
    const { menu } = props;

    const { user, loading } = useUIStatus();

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
                    <SkeletonAvatar src={user?.picture} loading={loading} imgProps={{ crossOrigin: 'anonymous' }} />
                    <Box ml={4}>
                        <SkeletonTypography variant="subtitle2" loading={loading} skeletonWidth="3em">
                            {user?.name}
                        </SkeletonTypography>
                        <SkeletonTypography variant="body2" color="textSecondary" loading={loading} skeletonWidth="5em">
                            系統管理員
                        </SkeletonTypography>
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