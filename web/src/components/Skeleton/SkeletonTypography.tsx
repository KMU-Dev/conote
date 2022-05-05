import Skeleton from "@mui/material/Skeleton";
import Typography, { TypographyProps } from "@mui/material/Typography";
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
