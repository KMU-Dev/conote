import { Avatar, Box, createStyles, InputLabel, makeStyles, Typography } from "@material-ui/core";
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { useCallback, useEffect } from "react";
import { Controller, FieldError, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { OAuth2User } from "../../graphql/type/OAuth2User";
import { StepContentProps } from "./StepContentProps";
import TailwindInput from "../../components/TailwindInput/TailwindInput";
import { useMutation } from "@apollo/client";
import { InitialCreateAdminDto, INITIAL_CREATE_ADMIN } from "../../graphql/mutations/initialSetup";
import { UserRole } from "../../graphql/type/user";

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
    const [initialCreateAdmin] = useMutation<InitialCreateAdminDto>(INITIAL_CREATE_ADMIN);

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
                <Controller
                    name="name"
                    control={control}
                    defaultValue={user.name}
                    render={({ field: { ref, ...fields }}) =>
                        <TailwindInput
                            {...fields}
                            inputRef={ref}
                            label="姓名"
                            required={true}
                            fullWidth={true}
                            error={errors.name && (errors.name as FieldError).message}
                            className={classes.textField}
                        />
                    }
                />
                <Controller
                    name="email"
                    control={control}
                    defaultValue={user.email}
                    render={({ field: { ref, ...fields } }) =>
                        <TailwindInput
                            {...fields}
                            innerRef={ref}
                            label="Email"
                            type="email"
                            required={true}
                            fullWidth={true}
                            error={errors.email && (errors.email as FieldError).message}
                            className={classes.textField}
                        />
                    }
                />
                <Controller
                    name="studentId"
                    control={control}
                    defaultValue={user.studentId}
                    render={({ field: { ref, ...fields } }) =>
                        <TailwindInput
                            {...fields}
                            inputRef={ref}
                            label="學號"
                            required={true}
                            fullWidth={true}
                            error={errors.studentId && (errors.studentId as FieldError).message}
                            className={classes.textField}
                        />
                    }
                />
            </form>
        </Box>
    );
}

export interface CreateUserProps extends StepContentProps {
    user: OAuth2User | null;
}
