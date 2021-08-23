import { MenuDefinition, MenuSection } from "./MenuDefinition";

export interface HeaderDefinition {
    navigation: MenuDefinition[];
    account: MenuDefinition[];
    admin: MenuSection[];
}
