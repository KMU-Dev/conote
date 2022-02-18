import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface PoliciesCardTitleProps {
    children?: ReactNode;
}

export default function PoliciesCardTitle(props: PoliciesCardTitleProps) {
    const { children } = props;

    return (
        <Typography
            variant="h4"
            mb={{ xs: 2, sm: 3, md: 4 }}
            color="common.white"
            fontSize={{ xs: '1.8129rem', sm: '2.0243rem', md: 'h4.fontSize' }}
            fontWeight="bold"
            lineHeight={1.235}
        >
            {children}
        </Typography>
    )
}