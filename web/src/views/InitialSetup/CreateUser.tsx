import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import { OAuth2User } from "../../graphql/type/OAuth2User";
import { StepContentProps } from "./StepContentProps";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            padding: theme.spacing(6),
        },
        title: {
            marginBottom: theme.spacing(2),
            fontSize: '1.5rem',
            lineHeight: 1.5,
        },
    }),
);

export default function CreateUser(props: CreateUserProps) {
    const { user } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.title}>建立使用者</Typography>
        </Box>
    );
}

export interface CreateUserProps extends StepContentProps {
    user: OAuth2User | null;
}
