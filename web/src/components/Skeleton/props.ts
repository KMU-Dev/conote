import { SkeletonSpecificProps } from "./type";

export function extractSkeletonProps<T extends Partial<SkeletonSpecificProps>>(props: T) {
    const { loading, animation, skeletonVariant, skeletonWidth, skeletonHeight, ...restProps } = props;
    return {
        loading,
        skeletonProps: { animation, variant: skeletonVariant, width: skeletonWidth, height: skeletonHeight }, 
        restProps
    };
}