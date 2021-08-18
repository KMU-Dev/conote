import { createElement } from 'react';
import { getTitleElement } from '../../utils/title';

export default function Page(props: PageProps) {
    const { title, component, children } = props;

    const titleElement = getTitleElement(title);

    return (
        <>
            {titleElement}
            {component ? createElement(component) : children}
        </>
    );
}

interface PageProps {
    title: string;
    component?: React.ComponentType<any>;
    children?: React.ReactNode
}
