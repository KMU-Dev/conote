import { useQuery } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { CentralProgress } from './components/Loading';
import { NotificationConfigurator } from './components/Notification';
import Page from './components/Page/Page';
import { navigate, RouterConfigurator } from './components/Router';
import routes from './constant/routes.json';
import { client } from './graphql/client';
import { UI_STATUS } from './graphql/queries/uiStatus';
import { GraphqlDto } from './graphql/type/type';
import { UIStatus } from './graphql/type/UIStatus';
import { getAccessTokenFromCahce } from './utils/auth';

// React lazy import
const ComingSoon = lazy(() => import(/* webpackPrefetch: true */ './views/ComingSoon/ComingSoon'));
const Login = lazy(() => import(/* webpackPrefetch: true */ './views/Login/Login'));
const VideoUpload = lazy(() => import(/* webpackPrefetch: true */ './views/VideoUpload/VideoUpload'));
const PrivacyPolicies = lazy(() => import(/* webpackPrefetch: true */ './views/PrivacyPolicies/PrivacyPolicies'));
const TermsOfService = lazy(() => import(/* webpackPrefetch: true */ './views/TermsOfService/TermsOfService'));
const Admin = lazy(() => import(/* webpackPrefetch: true */ './views/admin/Admin'));
const UserList = lazy(() => import(/* webpackPrefetch: true */ './views/admin/UserList/UserList'));
const NotFound = lazy(() => import(/* webpackPrefetch: true */ './views/NotFound/NotFound'));
const InitialSetup = lazy(() => import(/* webpackPrefetch: true */ './views/InitialSetup/InitialSetup'));

const loginExcluded = [routes.LOGIN, routes.TERMS_OF_SERVICE, routes.PRIVACY_POLICIES];

function App() {
    const theme = useTheme();
    const matchXsDown = useMediaQuery(theme.breakpoints.down('sm'));

    // handle UI status
    const onUIStatusFetched = (data: GraphqlDto<'uiStatus', UIStatus>) => {
        const uiStatus = data.uiStatus;
        if (uiStatus.initialSetup) {
            if (window.location.pathname !== routes.INITIAL_SETUP) navigate(routes.INITIAL_SETUP);
        } else if (!uiStatus.user) {
            if (!getAccessTokenFromCahce() && !loginExcluded.includes(window.location.pathname)) {
                navigate(routes.LOGIN);
            }
        }
    }

    useQuery<GraphqlDto<'uiStatus', UIStatus>>(UI_STATUS, { onCompleted: onUIStatusFetched });

    // sync logout
    useEffect(() => {
        window.addEventListener('storage', (e) => {
            if (e.key === 'logout') {
                client.resetStore();
                navigate(routes.LOGIN);
            }
        });
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
            <BrowserRouter>
                <RouterConfigurator />
                    <Routes>
                        <Route path={routes.INITIAL_SETUP} element={<Page title="初始設定" component={InitialSetup} />} />
                        <Route path={routes.LOGIN} element={<Page title="登入" component={Login} />} />
                        <Route path={routes.HOME} element={<Header />}>
                            <Route
                                index
                                element={
                                    <Page title="首頁">
                                        <ComingSoon time={new Date(1651334400000)} />
                                    </Page>
                                }
                            />
                            <Route
                                path={routes.DASHBOARD}
                                element={
                                    <Page title="總覽">
                                        <ComingSoon time={new Date(1651334400000)} />
                                    </Page>
                                }
                            />
                            <Route
                                path={routes.VIDEO_UPLOAD}
                                element={<Page title="上傳影片" component={VideoUpload} />}
                            />
                            <Route
                                path={routes.ACCOUNT}
                                element={
                                    <Page title="個人資料">
                                        <ComingSoon time={new Date(1651334400000)} />
                                    </Page>
                                }
                            />
                            <Route
                                path={routes.TERMS_OF_SERVICE}
                                element={<Page title="使用者服務條款" component={TermsOfService} scrollToTop />}
                            />
                            <Route
                                path={routes.PRIVACY_POLICIES}
                                element={<Page title="隱私權政策" component={PrivacyPolicies} scrollToTop />}
                            />
                            <Route path={routes.ADMIN_ROOT} element={<Page title="系統設定" component={Admin} />}>
                                <Route
                                    path={routes.ADMIN_USER_LIST}
                                    element={<Page title="使用者清單" component={UserList} fallback={<CentralProgress />} />}
                                />
                            </Route>
                            <Route path="*" element={<Page title="頁面不存在" component={NotFound} />} />
                        </Route>
                    </Routes>
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;
