export function generateAuthUrl(options: GenerateAuthUrlOpts) {
    // TODO: support code challenge
    const params = new URLSearchParams();
    for (const key in options) {
        if (key === 'scope') {
            const scopes = options[key];
            if (Array.isArray(scopes)) params.append('scope', scopes.join(' '));
            else if (scopes) params.append('scope', scopes);
        } else {
            const option = options[key as keyof typeof options];
            if (option) params.append(key, String(option));
        }
    }

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export interface GenerateAuthUrlOpts {
    /**
     * Recommended. Indicates whether your application can refresh access tokens
     * when the user is not present at the browser. Valid parameter values are
     * 'online', which is the default value, and 'offline'. Set the value to
     * 'offline' if your application needs to refresh access tokens when the user
     * is not present at the browser. This value instructs the Google
     * authorization server to return a refresh token and an access token the
     * first time that your application exchanges an authorization code for
     * tokens.
     */
    access_type?: string;
    /**
     * The hd (hosted domain) parameter streamlines the login process for G Suite
     * hosted accounts. By including the domain of the G Suite user (for example,
     * mycollege.edu), you can indicate that the account selection UI should be
     * optimized for accounts at that domain. To optimize for G Suite accounts
     * generally instead of just one domain, use an asterisk: hd=*.
     * Don't rely on this UI optimization to control who can access your app,
     * as client-side requests can be modified. Be sure to validate that the
     * returned ID token has an hd claim value that matches what you expect
     * (e.g. mycolledge.edu). Unlike the request parameter, the ID token claim is
     * contained within a security token from Google, so the value can be trusted.
     */
    hd?: string;
    /**
     * The 'response_type' will always be set to 'CODE'.
     */
    response_type?: string;
    /**
     * The client ID for your application. The value passed into the constructor
     * will be used if not provided. You can find this value in the API Console.
     */
    client_id?: string;
    /**
     * Determines where the API server redirects the user after the user
     * completes the authorization flow. The value must exactly match one of the
     * 'redirect_uri' values listed for your project in the API Console. Note that
     * the http or https scheme, case, and trailing slash ('/') must all match.
     * The value passed into the constructor will be used if not provided.
     */
    redirect_uri?: string;
    /**
     * Required. A space-delimited list of scopes that identify the resources that
     * your application could access on the user's behalf. These values inform the
     * consent screen that Google displays to the user. Scopes enable your
     * application to only request access to the resources that it needs while
     * also enabling users to control the amount of access that they grant to your
     * application. Thus, there is an inverse relationship between the number of
     * scopes requested and the likelihood of obtaining user consent. The
     * OAuth 2.0 API Scopes document provides a full list of scopes that you might
     * use to access Google APIs. We recommend that your application request
     * access to authorization scopes in context whenever possible. By requesting
     * access to user data in context, via incremental authorization, you help
     * users to more easily understand why your application needs the access it is
     * requesting.
     */
    scope?: string[] | string;
    /**
     * Recommended. Specifies any string value that your application uses to
     * maintain state between your authorization request and the authorization
     * server's response. The server returns the exact value that you send as a
     * name=value pair in the hash (#) fragment of the 'redirect_uri' after the
     * user consents to or denies your application's access request. You can use
     * this parameter for several purposes, such as directing the user to the
     * correct resource in your application, sending nonces, and mitigating
     * cross-site request forgery. Since your redirect_uri can be guessed, using a
     * state value can increase your assurance that an incoming connection is the
     * result of an authentication request. If you generate a random string or
     * encode the hash of a cookie or another value that captures the client's
     * state, you can validate the response to additionally ensure that the
     * request and response originated in the same browser, providing protection
     * against attacks such as cross-site request forgery. See the OpenID Connect
     * documentation for an example of how to create and confirm a state token.
     */
    state?: string;
    /**
     * Optional. Enables applications to use incremental authorization to request
     * access to additional scopes in context. If you set this parameter's value
     * to true and the authorization request is granted, then the new access token
     * will also cover any scopes to which the user previously granted the
     * application access. See the incremental authorization section for examples.
     */
    include_granted_scopes?: boolean;
    /**
     * Optional. If your application knows which user is trying to authenticate,
     * it can use this parameter to provide a hint to the Google Authentication
     * Server. The server uses the hint to simplify the login flow either by
     * prefilling the email field in the sign-in form or by selecting the
     * appropriate multi-login session. Set the parameter value to an email
     * address or sub identifier, which is equivalent to the user's Google ID.
     */
    login_hint?: string;
    /**
     * Optional. A space-delimited, case-sensitive list of prompts to present the
     * user. If you don't specify this parameter, the user will be prompted only
     * the first time your app requests access.  Possible values are:
     *
     * 'none' - Donot display any authentication or consent screens. Must not be
     *        specified with other values.
     * 'consent' - 	Prompt the user for consent.
     * 'select_account' - Prompt the user to select an account.
     */
    prompt?: string;
    /**
     * Recommended. Specifies what method was used to encode a 'code_verifier'
     * that will be used during authorization code exchange. This parameter must
     * be used with the 'code_challenge' parameter. The value of the
     * 'code_challenge_method' defaults to "plain" if not present in the request
     * that includes a 'code_challenge'. The only supported values for this
     * parameter are "S256" or "plain".
     */
    code_challenge_method?: CodeChallengeMethod;
    /**
     * Recommended. Specifies an encoded 'code_verifier' that will be used as a
     * server-side challenge during authorization code exchange. This parameter
     * must be used with the 'code_challenge' parameter described above.
     */
    code_challenge?: string;
}

export declare enum CodeChallengeMethod {
    Plain = "plain",
    S256 = "S256"
}
