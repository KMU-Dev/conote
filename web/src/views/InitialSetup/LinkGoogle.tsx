import { ApolloError, useMutation } from "@apollo/client";
import { Box, CircularProgress, Typography } from "@mui/material";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { useNotification } from "../../components/Notification";
import { INITIAL_GOOGLE_LINK } from "../../graphql/mutations/initialSetup";
import { OAuth2User } from "../../graphql/type/OAuth2User";
import { GraphqlDto } from "../../graphql/type/type";
import { StepContentProps } from "./StepContentProps";


export default function LinkGoogle(props: LinkGoogleProps) {
    const { onOAuthUserRetrieve, triggerNext } = props;

    const [initialGoogleLink, { loading }] = useMutation<
        GraphqlDto<'initialGoogleLink', OAuth2User>
    >(INITIAL_GOOGLE_LINK);
    const { enqueueUnknownErrorNotification } = useNotification();

    const handleCodeRetrieve = async (code: string) => {
        try {
            const response = await initialGoogleLink({ variables: { input: { code } } });
            if (response.data) {
                onOAuthUserRetrieve(response.data.initialGoogleLink);
                triggerNext();
            }
        } catch (e) {
            if (e instanceof ApolloError && !e.networkError) enqueueUnknownErrorNotification();
        }
    }

    return (
        <Box height={1} px={6} py={2}>
            <Box mt={6}>
                <Typography variant="h4" mb={2} fontSize="h5.fontSize" lineHeight={1.5}>綁定 Google 帳號</Typography>
                <Typography variant="body1" color="textSecondary">目前僅支援高雄醫學大學 Google Workspace 帳號</Typography>
            </Box>
            {loading ?
                <Box display="flex" justifyContent="center" py={12}>
                    <CircularProgress />
                </Box> :
                <GoogleLoginButton sx={{ my: 12, mx: 0 }} onCodeRetrieve={handleCodeRetrieve} />
            }
            <Typography variant="body2" color="textSecondary" mb={6}>
                此 Google 帳號將會作為您未來登入用的帳號，因此請您牢記登入資訊。
            </Typography>
        </Box>
    );
}

export interface LinkGoogleProps extends StepContentProps {
    onOAuthUserRetrieve: (user: OAuth2User) => void;
}
