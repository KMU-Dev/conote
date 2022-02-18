import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface PoliciesCardSubtitleProps {
    children?: ReactNode;
}

export default function PoliciesCardSubtitle(props: PoliciesCardSubtitleProps) {
    const { children } = props;

    return (
        <Typography
            variant="body1"
            mb={2}
            color="common.white"
        >
            {children}
        </Typography>
    )
}