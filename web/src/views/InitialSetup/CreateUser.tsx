import { useMutation } from "@apollo/client";
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Avatar, Box, InputLabel, SxProps, Theme, Typography } from "@mui/material";
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TailwindController } from "../../components/TailwindInput";
import { INITIAL_CREATE_ADMIN } from "../../graphql/mutations/initialSetup";
import { OAuth2User } from "../../graphql/type/OAuth2User";
import { GraphqlDto } from "../../graphql/type/type";
import { User, UserRole } from "../../graphql/type/user";
import { StepContentProps } from "./StepContentProps";

class CreateUserForm {
    @IsNotEmpty({ message: '姓名為必填欄位' })
    @MaxLength(256, { message: '姓名不可超過 $constraint1 個字元' })
    name?: string;

    @IsEmail(undefined, { message: '請填入正確的 email' })
    email?: string;

    @IsNotEmpty({ message: '學號為必填欄位' })
    @MaxLength(64, { message: '學號不可超過 $constraint1 個字元' })
    studentId?: string;
}

const textFieldSx: SxProps<Theme> = {
    my: 4
};

export default function CreateUser(props: CreateUserProps) {
    const { user, nextClicked, triggerNext } = props;

    const { control, handleSubmit, formState: { errors } } = useForm<CreateUserForm>({
        resolver: classValidatorResolver(CreateUserForm)
    });
    const [initialCreateAdmin] = useMutation<GraphqlDto<'initialCreateAdmin', User>>(INITIAL_CREATE_ADMIN);

    const onSubmit = useCallback<SubmitHandler<CreateUserForm>>(async (data) => {
        await initialCreateAdmin({
            variables: {
                input: { ...data, ...{ picture: user.picture, role: UserRole.ADMIN } }
            }
        });
        triggerNext();
    }, [initialCreateAdmin, user, triggerNext]);

    useEffect(() => {
        if (nextClicked) {
            handleSubmit(onSubmit)();
        }
    }, [nextClicked, handleSubmit, onSubmit]);

    return (
        <Box height={1} px={6} pt={6}>
            <Typography variant="h4" mb={2} fontSize="h5.fontSize" lineHeight={1.5}>建立使用者</Typography>
            <Box component="form" id="form" my={4}>
                <Box my={4}>
                    <InputLabel color="primary" sx={{ color: 'text.primary', fontSize: 'body2.fontSize' }}>頭像</InputLabel>
                    <Avatar
                        alt={user.name}
                        src={user.picture}
                        sx={{ width: 64, height: 64, mt: 2 }}
                        imgProps={{ crossOrigin: 'anonymous' }}
                    />
                </Box>
                <TailwindController
                    name="name"
                    control={control}
                    defaultValue={user.name}
                    label="姓名"
                    required={true}
                    fullWidth={true}
                    errors={errors}
                    sx={textFieldSx}
                />
                <TailwindController
                    name="email"
                    control={control}
                    defaultValue={user.email}
                    label="Email"
                    type="email"
                    required={true}
                    fullWidth={true}
                    errors={errors}
                    sx={textFieldSx}
                />
                <TailwindController
                    name="studentId"
                    control={control}
                    defaultValue={user.studentId}
                    label="學號"
                    required={true}
                    fullWidth={true}
                    errors={errors}
                    sx={textFieldSx}
                />
            </Box>
        </Box>
    );
}

export interface CreateUserProps extends StepContentProps {
    user: OAuth2User | null;
}
