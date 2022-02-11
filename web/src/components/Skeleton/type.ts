import { SkeletonProps } from "@mui/material";

export interface SkeletonSpecificProps {
    loading?: boolean;
    animation?: SkeletonProps['animation'];
    skeletonVariant?: SkeletonProps['variant'];
    skeletonWidth?: SkeletonProps['width'];
    skeletonHeight?: SkeletonProps['height'];
}
