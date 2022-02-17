import { GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { plainToClass } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsUrl, MaxLength, validateSync } from "class-validator";
import { UserRole, UserStatus } from "../../../graphql/type/user";

class EditedUser {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @MaxLength(256)
    name: string;

    @IsEmail(undefined)
    email?: string;

    @IsNotEmpty()
    @MaxLength(64)
    studentId: string;

    @IsUrl()
    picture?: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsEnum(UserStatus)
    status?: UserStatus;
}

export function validate(params: GridPreProcessEditCellProps, key: keyof EditedUser) {
    const editedUser = params.row;
    editedUser[key] = params.props.value;

    const editedUserObj = plainToClass(EditedUser, editedUser);
    const errors = validateSync(editedUserObj);
    return {...params.props, error: errors.length > 0 };
}
