import { ComponentProps, createElement } from "react";
import { CompatRoute } from "react-router-dom-v5-compat";
import { getTitleElement } from "../../utils/title";

export default function PageRoute(props: PageRouteProps) {
    const { title, component, children } = props;

    const titleElement = getTitleElement(title);

    return (
        <CompatRoute {...props} component={undefined}>
            <>
                {titleElement}
                {component ? createElement(component) : ''}
                {children}
            </>
        </CompatRoute>
    );
}

interface PageRouteProps extends ComponentProps<typeof CompatRoute> {
    title: string;
}
