import { useQuery } from '@apollo/client';
import { useMediaQuery, useTheme } from '@mui/material';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { NotificationConfigurator } from './components/Notification';
import PageRoute from './components/Page/PageRoute';
import routes from './constant/routes.json';
import { client } from './graphql/client';
import { UI_STATUS } from './graphql/queries/uiStatus';
import { GraphqlDto } from './graphql/type/type';
import { UIStatus } from './graphql/type/UIStatus';
import { getAccessTokenFromCahce } from './utils/auth';
import { history } from './utils/history';
import Admin from './views/admin/Admin';
import ComingSoon from './views/ComingSoon/ComingSoon';
import InitialSetup from './views/InitialSetup/InitialSetup';
import Login from './views/Login/Login';
import NotFound from './views/NotFound/NotFound';
import PrivacyPolicies from './views/PrivacyPolicies/PrivacyPolicies';
import TermsOfService from './views/TermsOfService/TermsOfService';
import VideoUpload from './views/VideoUpload/VideoUpload';

const loginExcluded = [routes.LOGIN, routes.TERMS_OF_SERVICE, routes.PRIVACY_POLICIES];

function App() {
    const theme = useTheme();
    const matchXsDown = useMediaQuery(theme.breakpoints.down('sm'));

    // handle UI status
    const onUIStatusFetched = (data: GraphqlDto<'uiStatus', UIStatus>) => {
        const uiStatus = data.uiStatus;
        if (uiStatus.initialSetup) {
            if (history.location.pathname !== routes.INITIAL_SETUP) history.push(routes.INITIAL_SETUP);
        } else if (!uiStatus.user) {
            if (!getAccessTokenFromCahce() && !loginExcluded.includes(window.location.pathname)) {
                history.push(routes.LOGIN);
            }
        }
    }

    useQuery<GraphqlDto<'uiStatus', UIStatus>>(UI_STATUS, { onCompleted: onUIStatusFetched });

    // sync logout
    useEffect(() => {
        window.addEventListener('storage', (e) => {
            if (e.key === 'logout') {
                client.resetStore();
                history.push(routes.LOGIN);
            }
        })
    }, []);

    const snackbarConfig: Partial<SnackbarProviderProps> = {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        dense: matchXsDown,
    };

    return (
        <SnackbarProvider {...snackbarConfig}>
            <NotificationConfigurator />
            <Router history={history}>
                <Switch>
                    <PageRoute exact path={routes.INITIAL_SETUP} component={InitialSetup} title="初始設定" />
                    <PageRoute exact path={routes.LOGIN} component={Login} title="登入" />
                    <Header>
                        <Switch>
                            <PageRoute exact path={routes.HOME} title="首頁">
                                <ComingSoon time={new Date(1648224000000)} />
                            </PageRoute>
                            <PageRoute exact path={routes.DASHBOARD} title="總覽">
                                <ComingSoon time={new Date(1648224000000)} />
                            </PageRoute>
                            <PageRoute
                                exact
                                path={routes.VIDEO_UPLOAD}
                                component={VideoUpload}
                                title="上傳影片"
                            />
                            <PageRoute exact path={routes.ACCOUNT} title="個人資料">
                                <ComingSoon time={new Date(1648224000000)} />
                            </PageRoute>
                            <PageRoute exact path={routes.TERMS_OF_SERVICE} title="使用者服務條款">
                                <TermsOfService />
                            </PageRoute>
                            <PageRoute exact path={routes.PRIVACY_POLICIES} title="隱私權政策">
                                <PrivacyPolicies />
                            </PageRoute>
                            <Route path={routes.ADMIN_ROOT} component={Admin} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Header>
                </Switch>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
