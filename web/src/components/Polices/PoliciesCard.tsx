import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface PoliciesCardProps {
    children?: ReactNode;
}

export default function PoliciesCard(props: PoliciesCardProps) {
    const { children } = props;

    return (
        <Box
            boxShadow="rgb(140 152 164 / 18%) 0px 10px 40px 10px"
            borderRadius={2}
        >
            {children}
        </Box>
    )
}
