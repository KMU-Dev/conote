import { MenuDefinition, MenuSection } from "./MenuDefinition";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideocamIcon from '@material-ui/icons/Videocam';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import ClassIcon from '@material-ui/icons/Class';
import routes from '../../constant/routes.json';

export interface HeaderDefinition {
    navigation: MenuDefinition[];
    account: MenuDefinition[];
    admin: MenuSection[];
}

export const headerDef: HeaderDefinition = {
    navigation: [
        { name: '總覽', href: routes.DASHBOARD, icon: <DashboardIcon />, exact: true  },
        { name: '影片', href: routes.VIDEO_UPLOAD, icon: <VideocamIcon />, exact: false },
    ],
    account: [
        { name: '總覽', href: '/account', icon: <PersonOutlineIcon />, exact: true },
        { name: '系統設定', href: '/admin', icon: <SettingsIcon />, exact: true },
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
}
