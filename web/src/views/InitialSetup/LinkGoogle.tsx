import { ApolloError, useMutation } from "@apollo/client";
import { Box, CircularProgress, createStyles, makeStyles, Typography } from "@material-ui/core";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { useNotification } from "../../components/Notification";
import { InitialGoogleLinkDto, INITIAL_GOOGLE_LINK } from "../../graphql/mutations/initialSetup";
import { OAuth2User } from "../../graphql/type/OAuth2User";
import { StepContentProps } from "./StepContentProps";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '100%',
            padding: theme.spacing(2, 6),
        },
        image: {
            width: '100%',
            maxHeight: '220px',
            padding: theme.spacing(6),
        },
        titleBox: {
            marginTop: theme.spacing(6),
        },
        title: {
            marginBottom: theme.spacing(2),
            fontSize: '1.5rem',
            lineHeight: 1.5,
        },
        button: {
            margin: theme.spacing(12, 0),
        },
        loadingBox: {
            padding: theme.spacing(12, 0),
            display: 'flex',
            justifyContent: 'center',
        },
        subtitle: {
            marginBottom: theme.spacing(6),
        }
    }),
);

export default function LinkGoogle(props: LinkGoogleProps) {
    const { onOAuthUserRetrieve, triggerNext } = props;
    const classes = useStyles();

    const [initialGoogleLink, { loading }] = useMutation<InitialGoogleLinkDto>(INITIAL_GOOGLE_LINK);
    const { enqueueUnknownErrorNotification } = useNotification();

    const handleCodeRetrieve = async (code: string) => {
        try {
            const response = await initialGoogleLink({ variables: { input: { code } } });
            if (response.data) {
                onOAuthUserRetrieve(response.data.initialGoogleLink);
                triggerNext();
            }
            else enqueueUnknownErrorNotification();
        } catch (e) {
            if (e instanceof ApolloError && !e.networkError) enqueueUnknownErrorNotification();
        }
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h4" className={classes.title}>綁定 Google 帳號</Typography>
                <Typography variant="body1" color="textSecondary">目前僅支援高雄醫學大學 Google Workspace 帳號</Typography>
            </Box>
            {loading ?
                <Box className={classes.loadingBox}>
                    <CircularProgress />
                </Box> :
                <GoogleLoginButton className={classes.button} onCodeRetrieve={handleCodeRetrieve} />
            }
            <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
                此 Google 帳號將會作為您未來登入用的帳號，因此請您牢記登入資訊。
            </Typography>
        </Box>
    );
}

export interface LinkGoogleProps extends StepContentProps {
    onOAuthUserRetrieve: (user: OAuth2User) => void;
}
