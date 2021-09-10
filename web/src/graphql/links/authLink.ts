import { history } from "../../utils/history";
import routes from '../../constant/routes.json';
import { getAccessTokenFromCahce } from "../../utils/auth";
import { gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { client } from "../client";
import { REFRESH_TOKEN } from "../mutations/auth";
import { GraphqlDto } from "../type/type";
import { AuthPaylaod } from "../type/AuthPayload";

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
            if (operation.operationName !== 'UIStatus') history.push(routes.LOGIN);
        }
    }

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    };
});

export function resetAccessToken() {
    accessToken = undefined;
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
