import React from "react";
import { Link, LinkProps, matchPath } from "react-router-dom";

export const isMatch = (pattern: string) => (
    matchPath(pattern, window.location.pathname)
);

export const useRenderLink = (to: string) => React.useMemo(
    () =>
        React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
            <Link to={to} ref={ref} {...itemProps} />
        )),
    [to],
);
