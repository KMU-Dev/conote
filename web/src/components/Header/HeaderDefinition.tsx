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
        { name: '總覽', href: routes.DASHBOARD, icon: <DashboardIcon />  },
        { name: '影片', href: routes.VIDEO_UPLOAD, icon: <VideocamIcon /> },
    ],
    account: [
        { name: '個人資料', href: routes.ACCOUNT, icon: <PersonOutlineIcon /> },
        {
            name: '系統設定',
            href: routes.ADMIN_ROOT,
            icon: <SettingsIcon />,
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
                        { name: '清單', type: 'collapse_item', href: routes.ADMIN_USER_LIST },
                        { name: '詳細資料', type: 'collapse_item', href: '/admin/users/:id' },
                    ],
                },
                {
                    name: '班級',
                    type: 'collapse',
                    icon: <ClassIcon />,
                    items: [
                        { name: '清單', type: 'collapse_item', href: '/admin/class' },
                        { name: '詳細資料', type: 'collapse_item', href: '/admin/class/:id' },
                    ],
                }
            ],
        },
    ],
});
