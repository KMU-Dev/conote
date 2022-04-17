import { UserRole } from "../../graphql/type/user";

export function getDisplayedRole(role: UserRole) {
    switch (role) {
        case UserRole.ADMIN:
            return '系統管理員';
        case UserRole.USER:
            return '使用者';
    }
}
