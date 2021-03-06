import { gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { navigate } from "../../components/Router";
import routes from '../../constant/routes.json';
import { getAccessTokenFromCahce } from "../../utils/auth";
import { client } from "../client";
import { REFRESH_TOKEN } from "../mutations/auth";
import { AuthPaylaod } from "../type/AuthPayload";
import { GraphqlDto } from "../type/type";

let accessToken: string;
const excludedOperations = ['Login', 'Logout', 'RefreshToken', 'InitialGoogleLink', 'InitialCreateAdmin'];

export const authLink = setContext(async (operation) => {
    if (excludedOperations.includes(operation.operationName)) return;

    let shouldRefresh = false;
    if (accessToken) {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        if (Date.now() + 5000 > payload.exp * 1000) shouldRefresh = true;
    } else {
        const cahceAccessToken = getAccessTokenFromCahce();
        if (cahceAccessToken) accessToken = cahceAccessToken;
        else shouldRefresh = true;
    }

    if (shouldRefresh) {
        try {
            accessToken = await refreshAccessToken();
        } catch (e) {
            // Cannot migrate to navigate since useNavigate() is a react hook
            if (operation.operationName !== 'UIStatus') navigate(routes.LOGIN);
        }
    }

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    };
});

export function setAccessToken(token?: string) {
    accessToken = token;
}

async function refreshAccessToken() {
    const result = await client.mutate<GraphqlDto<'refreshToken', AuthPaylaod>>({
        mutation:  REFRESH_TOKEN,
        update: (cache, { data: { refreshToken }}) => {
            cache.writeFragment({
                fragment: gql`
                    fragment CurrentAuthPayload on AuthPayload {
                        accessToken
                    }
                `,
                data: refreshToken,
            })
        },
    });
    return result.data.refreshToken.accessToken;
}
