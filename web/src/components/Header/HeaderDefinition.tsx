import ClassIcon from '@mui/icons-material/Class';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleIcon from '@mui/icons-material/People';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import VideocamIcon from '@mui/icons-material/Videocam';
import routes from '../../constant/routes.json';
import { UIStatus } from "../../graphql/type/UIStatus";
import { UserRole } from "../../graphql/type/user";
import { AccountMenuDefinition } from "./AccountDropdown";
import { MenuDefinition, MenuSection } from "./MenuDefinition";

export interface HeaderDefinition {
    navigation: MenuDefinition[];
    account: AccountMenuDefinition[];
    admin: MenuSection[];
}

export const getHeaderDef = (uiStatus?: UIStatus): HeaderDefinition => ({
    navigation: [
        { name: '總覽', href: routes.DASHBOARD, icon: <DashboardIcon />, exact: true  },
        { name: '影片', href: routes.VIDEO_UPLOAD, icon: <VideocamIcon />, exact: false },
    ],
    account: [
        { name: '總覽', href: '/account', icon: <PersonOutlineIcon />, exact: true },
        {
            name: '系統設定',
            href: '/admin',
            icon: <SettingsIcon />,
            exact: true,
            hidden: uiStatus?.user?.role !== UserRole.ADMIN,
        },
        { name: '登出', icon: <ExitToAppIcon /> },
    ],
    admin: [
        {
            id: 'management',
            name: '管理',
            items: [
                {
                    name: '使用者',
                    type: 'collapse',
                    icon: <PeopleIcon />,
                    items: [
                        { name: '清單', type: 'collapse_item', href: '/admin/users', exact: true },
                        { name: '詳細資料', type: 'collapse_item', href: '/admin/users/{:id}', exact: true },
                    ],
                },
                {
                    name: '班級',
                    type: 'collapse',
                    icon: <ClassIcon />,
                    items: [
                        { name: '清單', type: 'collapse_item', href: '/admin/class', exact: true },
                        { name: '詳細資料', type: 'collapse_item', href: '/admin/class/{id}', exact: true },
                    ],
                }
            ],
        },
    ],
});
