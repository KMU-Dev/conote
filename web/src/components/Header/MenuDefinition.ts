import { ReactChild } from "react";

export interface MenuDefinition {
    name: string;
    href: string;
    icon: ReactChild;
}

export interface MenuSection {
    name: string;
    id: string;
    items: MenuItemDefinition[];
}

export type MenuItemDefinition = MenuDefaultItemDefinition | MenuCollapseDefinition;

type MenuItemType = 'collapse' | 'collapse_item' | 'item';

interface IMenuItemDefinition {
    type: MenuItemType;
    name: string;
}

interface ILinkMenuItemDefinition extends IMenuItemDefinition {
    type: 'collapse_item' | 'item';
    href: string;
}
export interface MenuDefaultItemDefinition extends ILinkMenuItemDefinition {
    type: 'item';
    icon: ReactChild;
}

export interface MenuCollapseDefinition extends IMenuItemDefinition {
    type: 'collapse';
    icon: ReactChild;
    items: MenuCollapseItemDefinition[];
}

export interface MenuCollapseItemDefinition extends ILinkMenuItemDefinition {
    type: 'collapse_item';
}
