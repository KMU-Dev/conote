import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface PoliciesCardContactProps {
    title: ReactNode;
    subtitle: ReactNode;
    contact: ReactNode;
}

export default function PoliciesCardContact(props: PoliciesCardContactProps) {
    const { title, subtitle, contact } = props;

    return (
        <Grid item xs={12} md={3}>
            <Box position="sticky" top="80px">
                <Card
                    sx={{
                        boxShadow: 'none',
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'action.focus',
                    }}
                >
                    <Box p={{ xs: 4, sm: 6}}>
                        <Typography variant="body1" fontWeight={500} mb={{ xs: 2, sm: 3, md: 4}}>
                            {title}
                        </Typography>
                        <Typography variant="body2" mb={4} color="text.secondary">
                            {subtitle}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={400}>
                            {contact}
                        </Typography>
                    </Box>
                </Card>
            </Box>
        </Grid>
    );
}