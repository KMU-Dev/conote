import { Avatar, Box, createStyles, InputLabel, makeStyles, Typography } from "@material-ui/core";
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { OAuth2User } from "../../graphql/type/OAuth2User";
import { StepContentProps } from "./StepContentProps";
import { useMutation } from "@apollo/client";
import { INITIAL_CREATE_ADMIN } from "../../graphql/mutations/initialSetup";
import { User, UserRole } from "../../graphql/type/user";
import { TailwindController } from "../../components/TailwindInput";
import { GraphqlDto } from "../../graphql/type/type";

class CreateUserForm {
    @IsNotEmpty({ message: '姓名為必填欄位' })
    @MaxLength(256, { message: '姓名不可超過 $constraint1 個字元' })
    name: String;

    @IsEmail(undefined, { message: '請填入正確的 email' })
    email?: String;

    @IsNotEmpty({ message: '學號為必填欄位' })
    @MaxLength(64, { message: '學號不可超過 $constraint1 個字元' })
    studentId: String;
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            padding: theme.spacing(6, 6, 0, 6),
        },
        title: {
            marginBottom: theme.spacing(2),
            fontSize: '1.5rem',
            lineHeight: 1.5,
        },
        form: {
            margin: theme.spacing(4, 0),
        },
        textField: {
            margin: theme.spacing(4, 0),
        },
        inputLabel: {
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
        },
        avatar: {
            width: theme.spacing(14),
            height: theme.spacing(14),
            marginTop: theme.spacing(2),
        }
    }),
);

export default function CreateUser(props: CreateUserProps) {
    const { user, nextClicked, triggerNext } = props;
    const classes = useStyles();

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
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.title}>建立使用者</Typography>
            <form id="form" className={classes.form}>
                <Box className={classes.textField}>
                    <InputLabel color="primary" className={classes.inputLabel}>頭像</InputLabel>
                    <Avatar alt={user.name} src={user.picture} className={classes.avatar} />
                </Box>
                <TailwindController
                    name="name"
                    control={control}
                    defaultValue={user.name}
                    label="姓名"
                    required={true}
                    fullWidth={true}
                    errors={errors}
                    className={classes.textField}
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
                    className={classes.textField}
                />
                <TailwindController
                    name="studentId"
                    control={control}
                    defaultValue={user.studentId}
                    label="學號"
                    required={true}
                    fullWidth={true}
                    errors={errors}
                    className={classes.textField}
                />
            </form>
        </Box>
    );
}

export interface CreateUserProps extends StepContentProps {
    user: OAuth2User | null;
}
