import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ReactNode } from "react";

interface PoliciesCardContentProps {
    children?: ReactNode;
}

export default function PoliciesCardContent(props: PoliciesCardContentProps) {
    const { children } = props;

    return (
        <Box
            position="relative"
            top="0px"
            width={1}
            maxWidth={{ sm: 720, md: 1236 }}
            mx="auto"
            px={{ xs: 4, sm: 8 }}
            py={{ xs: 8, sm: 12 }}
            pt={{ xs: 0, sm: 0 }}
            pb={{ md: 16 }}
            bgcolor="background.paper"
        >
            <Grid
                container
                spacing={4}
                sx={{
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    mt: 0,
                    '& > .MuiGrid-item': {
                        pl: 4,
                    },
                    '& > .MuiGrid-item:first-of-type': {
                        pt: { xs: 8, md: 4 },
                    },
                }}
                flexDirection={{ xs: 'column-reverse', md: 'row' }}
                mt={0}
            >
                {children}
            </Grid>
        </Box>
    );
}