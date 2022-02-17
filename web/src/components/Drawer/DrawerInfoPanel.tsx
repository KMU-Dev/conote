import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { Box, Divider, Link, Typography } from "@mui/material";
import { forwardRef, MouseEvent } from "react";
import { useUIStatus } from "../../graphql/hooks/useUIStatus";
import { SkeletonAvatar } from '../Skeleton';
import SkeletonTypography from '../Skeleton/SkeletonTypography';
import { DrawerVariant } from "./types";


const DrawerInfoPanel = forwardRef<HTMLAnchorElement, DrawerInfoPanelProps>((props, ref) => {
    const { variant, onGoBackClick } = props;

    const { user, loading } = useUIStatus();

    const handleGoBackLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onGoBackClick();
    }

    return (
        <>
            <Box p={5}>
                {variant === 'default' ?
                    <LocalLibraryOutlinedIcon color="primary" sx={{ fontSize: 40 }} /> :
                    <>
                        <Link
                            ref={ref}
                            underline="hover"
                            color="textSecondary"
                            sx={{ cursor: 'pointer' }}
                            onClick={handleGoBackLinkClick}
                        >
                            <Box display="flex" alignItems="center">
                                <ArrowBackIcon fontSize="small" />
                                <Typography variant="body2" sx={{ ml: 2 }}>返回主選單</Typography>
                            </Box>
                        </Link>
                        <Box display="flex" alignItems="center" mt={6}>
                            <SkeletonAvatar src={user?.picture} loading={loading} />
                            <Box ml={4}>
                                <SkeletonTypography variant="subtitle2" loading={loading} skeletonWidth="3em">
                                    {user?.name}
                                </SkeletonTypography>
                                <SkeletonTypography variant="body2" color="textSecondary" loading={loading} skeletonWidth="5em">
                                    系統管理員
                                </SkeletonTypography>
                            </Box>
                        </Box>
                    </>
                }
            </Box>
            {variant === 'admin' ? <Divider /> : ''}
        </>
    );
});

interface DrawerInfoPanelProps {
    variant: DrawerVariant;
    onGoBackClick: GoBackClickCallback;
}

type GoBackClickCallback = () => void;

export default DrawerInfoPanel;
