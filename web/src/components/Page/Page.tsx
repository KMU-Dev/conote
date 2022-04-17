import { createElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTitleElement } from '../../utils/title';

export default function Page(props: PageProps) {
    const { title, component, children, scrollToTop } = props;

    const { pathname } = useLocation();

    useEffect(() => {
        if (scrollToTop) {
            window.scrollTo(0, 0);
        }
    }, [scrollToTop, pathname]);

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
    children?: React.ReactNode;
    scrollToTop?: boolean;
}
