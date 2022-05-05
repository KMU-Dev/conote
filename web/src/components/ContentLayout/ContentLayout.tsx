import Box, { BoxProps } from "@mui/material/Box";

interface ContentLayoutProps extends BoxProps {}

export default function ContentLayout(props: ContentLayoutProps) {
    return (
        <Box
            width={1}
            maxWidth={{
                sm: 720,
                md: 1236,
            }}
            height={1}
            minHeight={1}
            mx="auto"
            px={{
                xs: 4,
            }}
            py={{
                xs: 8,
                sm: 12,
            }}
            {...props}
        />
    );
}