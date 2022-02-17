import { Skeleton } from "@mui/material";
import { ImgHTMLAttributes } from "react";
import { extractSkeletonProps } from "./props";
import { SkeletonSpecificProps } from "./type";

interface SkeletonImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'>, SkeletonSpecificProps {}

export default function SkeletonImg(props: SkeletonImgProps) {
    const { loading, skeletonProps, restProps } = extractSkeletonProps(props);

    console.log(skeletonProps);

    if (loading) return (
        <Skeleton {...skeletonProps} />
    );

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...restProps} />;
}
