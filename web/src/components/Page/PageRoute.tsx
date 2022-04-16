import { Route, RouteProps } from "react-router-dom";
import { getTitleElement } from "../../utils/title";

export default function PageRoute(props: PageRouteProps) {
    const { title, element, children } = props;

    const titleElement = getTitleElement(title);

    return (
        <Route
            {...props}
            element={
                element ?
                    <>
                        {titleElement}
                        {element}
                    </> :
                    undefined
            }
        >
            {children ?
                <>
                    {titleElement}
                    {children}
                </> :
                undefined
            }
        </Route>
    );
}

interface PageRouteProps extends RouteProps {
    title: string;
}
