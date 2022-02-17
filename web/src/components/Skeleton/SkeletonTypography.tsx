import { Skeleton, Typography, TypographyProps } from "@mui/material";
import { extractSkeletonProps } from "./props";
import { SkeletonSpecificProps } from "./type";

interface SkeletonTypographyProps extends TypographyProps, SkeletonSpecificProps {}

export default function SkeletonTypography(props: SkeletonTypographyProps) {
    const { loading, skeletonProps, restProps: { children, ...restProps } } = extractSkeletonProps(props);

    return (
        <Typography {...restProps}>
            {loading ? <Skeleton {...skeletonProps} /> : children}
        </Typography>
    );
}
