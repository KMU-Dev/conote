import Avatar, { AvatarProps } from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
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
