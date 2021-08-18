import routes from '../../constant/routes.json';

export interface BreadcrumbConfig {
    [key: string]: BreadcrumbConfigElement
}

export interface BreadcrumbConfigElement {
    name: string;
    route: keyof typeof routes;
    children?: BreadcrumbConfig;
}
