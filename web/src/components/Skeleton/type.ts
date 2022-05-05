import { SkeletonProps } from "@mui/material/Skeleton";

export interface SkeletonSpecificProps {
    loading?: boolean;
    animation?: SkeletonProps['animation'];
    skeletonVariant?: SkeletonProps['variant'];
    skeletonWidth?: SkeletonProps['width'];
    skeletonHeight?: SkeletonProps['height'];
}
