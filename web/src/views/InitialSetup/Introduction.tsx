import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import AppreciationSecondaryImage from "./appreciation_secondary.svg";
import { StepContentProps } from "./StepContentProps";


const textSx: SxProps<Theme> = {
    my: 4,
    fontWeight: 'lighter',
};

export default function Introduction(props: StepContentProps) {
    const { nextClicked, triggerNext } = props;

    useEffect(() => {
        if (nextClicked) triggerNext();
    }, [nextClicked, triggerNext]);

    return (
        <Box py={2} px={6}>
            <Box
                component="img"
                src={AppreciationSecondaryImage}
                alt="Launching"
                width={1}
                maxHeight={220}
                p={6}
            />
            <Typography sx={textSx}>感謝您使用 Conote</Typography>
            <Typography sx={textSx}>
                在接下來的步驟中，你將會建立系統管理員使用者，往後要更改系統設定時，請使用該帳號登入。
            </Typography>
            <Typography sx={textSx}>
                事不宜遲，我們開始吧~
            </Typography>
        </Box>
    );
}
