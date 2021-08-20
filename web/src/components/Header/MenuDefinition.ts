import { ReactChild } from "react";

export interface MenuDefinition {
    name: string;
    href: string;
    icon: ReactChild;
    exact: boolean;
}
