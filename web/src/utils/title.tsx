import { ComponentType, createElement } from "react";
import { Helmet } from "react-helmet-async";

export function getTitle(title: string) {
    const titleSuffix = ' | Conote';
    return `${title}${titleSuffix}`;
}

export function getTitleElement(title: string) {
    return (
        <Helmet>
            <title>{getTitle(title)}</title>
        </Helmet>
    );
}

export function withTitle(title: string) {
    return (component: ComponentType<any>) => () => (
        <>
            {getTitleElement(title)}
            {createElement(component)}
        </>
    );
}
