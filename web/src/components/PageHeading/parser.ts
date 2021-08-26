import routes from '../../constant/routes.json';
import breadcrumb from '../../constant/breadcrumb.json';
import { BreadcrumbConfig } from './BreadcrumbConfig';
import { BreadcrumbDefinition } from './BreadcrumbDefinition';

export function parseBreadcrumbPath(path: string): BreadcrumbDefinition[] {
    const breacrumbConfig = breadcrumb as BreadcrumbConfig;
    const keys = path.split('.');
    const defs: BreadcrumbDefinition[] = [];

    let current = breacrumbConfig.home;
    defs.push({ name: current.name, path: routes[current.route] });

    for (const key of keys) {
        if (!current.children) throw new InvalidBreadcrumbPathError(current.name, key);
        current = current.children[key];
        defs.push({ name: current.name, path: routes[current.route] });
    }

    return defs;
}

export class InvalidBreadcrumbPathError extends Error {
    constructor(name: string, key: string) {
        super(`Cannot find children "${key}" in breadcrumb config "${name}". Make sure you have specified correct key.`);
    }
}
