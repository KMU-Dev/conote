import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import routes from "../../constant/routes.json";
import LaunchingImage from "./launching.svg";
import { StepContentProps } from "./StepContentProps";


const textSx: SxProps<Theme> = {
    my: 4,
    fontWeight: 'lighter',
};

export default function Finish(props: StepContentProps) {
    const { nextClicked } = props;

    const navigate = useNavigate();

    useEffect(() => {
        if (nextClicked) navigate(routes.LOGIN, { replace: true });
    }, [nextClicked, navigate]);

    return (
        <Box px={6} py={2}>
            <Box
                component="img"
                src={LaunchingImage}
                alt="Launching"
                width={1}
                maxHeight={220}
                p={6}
            />
            <Typography sx={textSx}>Conote 已完成設定</Typography>
            <Typography sx={textSx}>
                從現在起，你可以立即享受 Conote 在管理共筆、維護影片為你帶來的便利，如果喜歡這個專案，也不妨給開發者一個支持喔。
            </Typography>
        </Box>
    );
}
