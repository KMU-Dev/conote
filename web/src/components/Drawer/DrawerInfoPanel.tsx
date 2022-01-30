import { Avatar, Box, Divider, Link, Typography } from "@mui/material";
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DrawerVariant } from "./types";
import { MouseEvent, forwardRef } from "react";


const DrawerInfoPanel = forwardRef<HTMLAnchorElement, DrawerInfoPanelProps>((props, ref) => {
    const { variant, onGoBackClick } = props;

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
                            <Avatar />
                            <Box ml={4}>
                                <Typography variant="subtitle2">趙子賢</Typography>
                                <Typography variant="body2" color="textSecondary">系統管理員</Typography>
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
