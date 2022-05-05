import Box, { BoxProps } from '@mui/material/Box';


export default function AppLayout(props: AppLayoutProps) {
    const { sx } = props;

    return <Box
        {...props}
        sx={[
            {
                height: 1,
                minHeight: 1,
                px: {
                    xs: 4,
                    sm: 6,
                    lg: 8,
                },
                py: {
                    xs: 6,
                    lg: 8,
                },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
    />;
}

interface AppLayoutProps extends BoxProps {}
