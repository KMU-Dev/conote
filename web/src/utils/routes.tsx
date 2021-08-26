import React from "react";
import { Link, matchPath, LinkProps } from "react-router-dom";

export const isMatch = (path: string, exact: boolean) => (
    matchPath(window.location.pathname, { path: path, exact })
);

export const useRenderLink = (to: string) => React.useMemo(
    () =>
        React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
            <Link to={to} ref={ref} {...itemProps} />
        )),
    [to],
);
