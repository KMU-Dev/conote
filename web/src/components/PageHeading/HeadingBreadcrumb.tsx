import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { SxProps, Theme } from "@mui/material/styles";
import { Link as RouterLink } from 'react-router-dom';
import { BreadcrumbDefinition } from "./BreadcrumbDefinition";
import { parseBreadcrumbPath } from "./parser";

export default function HeadingBreadcrumb(props: HeadingBreadcrumbProps) {
    const { path, sx } = props;

    const defs = parseBreadcrumbPath(path);

    const elements = (defs: BreadcrumbDefinition[]) => defs.map((def, i) => {
        if (i === defs.length - 1) {
            return (
                <Link
                    key={i}
                    color="textPrimary"
                    variant="body2"
                    component={RouterLink}
                    to={def.path}
                    aria-current="page"
                    underline="hover">
                    {def.name}
                </Link>
            );
        }
        return (
            <Link
                key={i}
                color="inherit"
                variant="body2"
                component={RouterLink}
                to={def.path}
                underline="hover">
                    {def.name}
            </Link>
        );
    })

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={sx}
        >
            {elements(defs)}
        </Breadcrumbs>
    );
}

interface HeadingBreadcrumbProps {
    path: string;
    sx?: SxProps<Theme>;
}
