import { ComponentProps, createElement } from "react";
import { Route } from "react-router-dom";
import { getTitleElement } from "../../utils/title";

export default function PageRoute(props: PageRouteProps) {
    const { title, component, children } = props;

    const titleElement = getTitleElement(title);

    return (
        <Route {...props} component={undefined}>
            <>
                {titleElement}
                {component ? createElement(component) : ''}
                {children}
            </>
        </Route>
    );
}

interface PageRouteProps extends ComponentProps<typeof Route> {
    title: string;
}
