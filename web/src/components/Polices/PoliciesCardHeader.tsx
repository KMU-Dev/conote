import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface PoliciesCardHeaderProps {
    children?: ReactNode;
    bgcolor?: string;
}

export default function PoliciesCardHeader(props: PoliciesCardHeaderProps) {
    const { children, bgcolor } = props;

    return (
        <Box
            bgcolor={bgcolor ?? 'primary.main'}
            borderRadius={2}
        >
            <Box
                width={1}
                maxWidth={{
                    sm: 720,
                    md: 1236,
                }}
                mx="auto"
                px={{
                    xs: 4,
                    sm: 8,
                }}
                py={{
                    xs: 8,
                    sm: 12,
                    md: 16,
                }}
            >
                {children}
            </Box>
            <Box
                component="svg"
                preserveAspectRatio="none"
                x="0px"
                y="0px"
                viewBox="0 0 1920 100.1"
                width={1}
                mb={-2}
            >
                <path fill="#ffffff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
            </Box>
        </Box>
    )
}
