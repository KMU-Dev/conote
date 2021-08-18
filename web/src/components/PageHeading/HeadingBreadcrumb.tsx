import { Breadcrumbs, Link } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';
import { BreadcrumbDefinition } from "./BreadcrumbDefinition";
import { parseBreadcrumbPath } from "./parser";

export default function HeadingBreadcrumb(props: HeadingBreadcrumbProps) {
    const { path, className } = props;

    const defs = parseBreadcrumbPath(path);

    const elements = (defs: BreadcrumbDefinition[]) => defs.map((def, i) => {
        if (i === defs.length - 1) {
            return (
                <Link key={i} color="textPrimary" variant="body2" component={RouterLink} to={def.path} aria-current="page">
                    {def.name}
                </Link>
            );
        }
        return (
            <Link key={i} color="inherit" variant="body2" component={RouterLink} to={def.path}>
                    {def.name}
            </Link>
        );
    })

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={className}
        >
            {elements(defs)}
        </Breadcrumbs>
    );
}

interface HeadingBreadcrumbProps {
    path: string;
    className?: string;
}
