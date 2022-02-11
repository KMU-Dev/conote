import { Avatar, AvatarProps, Skeleton } from "@mui/material";
import { extractSkeletonProps } from "./props";
import { SkeletonSpecificProps } from "./type";

interface SkeletonAvatarProps extends AvatarProps, Omit<SkeletonSpecificProps, 'skeletonVariant'> {}

export default function SkeletonAvatar(props: SkeletonAvatarProps) {
    const { loading, skeletonProps: { variant, ...skeletonProps }, restProps } = extractSkeletonProps(props);

    if (loading) return (
        <Skeleton variant="circular" {...skeletonProps}>
            <Avatar {...restProps} />
        </Skeleton>
    );
    return <Avatar {...restProps} />;
}
