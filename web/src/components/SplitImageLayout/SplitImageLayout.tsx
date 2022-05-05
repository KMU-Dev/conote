import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SxProps, Theme } from "@mui/material/styles";
import { ReactNode } from "react";


export default function SplitImageLayout(props: SplitImageLayoutProps) {
    const { children, image, alt, classes } = props;

    return (
        <Box height={1} minHeight={1} px={4} py={{ xs: 8, sm: 12, md: 16 }}>
            <Grid container minHeight={1} justifyContent='center' alignContent="center">
                <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="center" pr={{ md: 6, lg: 18 }}>
                    <Box component="img" src={image} alt={alt} width={1} maxWidth={{ xs: 500, md: 'unset' }} p={4} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={[
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            maxWidth: (theme) => ({
                                xs: theme.breakpoints.values.sm,
                            }),
                            justifyContent: 'center',
                            py: 12,
                            px: { lg: 6 },
                        },
                        ...(Array.isArray(classes?.textGrid) ? classes?.textGrid : [classes?.textGrid]),
                    ]}
                >
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
}

interface Classes {
    textGrid?: SxProps<Theme>;
}

interface SplitImageLayoutProps {
    children: ReactNode;
    image: string;
    alt: string;
    classes?: Classes;
}
