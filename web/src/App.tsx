import { useQuery } from '@apollo/client';
import { useMediaQuery, useTheme } from '@mui/material';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { NotificationConfigurator } from './components/Notification';
import Page from './components/Page/Page';
import { navigate, RouterConfigurator } from './components/Router';
import routes from './constant/routes.json';
import { client } from './graphql/client';
import { UI_STATUS } from './graphql/queries/uiStatus';
import { GraphqlDto } from './graphql/type/type';
import { UIStatus } from './graphql/type/UIStatus';
import { getAccessTokenFromCahce } from './utils/auth';
import Admin from './views/admin/Admin';
import UserList from './views/admin/UserList/UserList';
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
                        <Route path={routes.ADMIN_ROOT} element={<Admin />}>
                            <Route
                                path={routes.ADMIN_USER_LIST}
                                element={<Page title="使用者清單" component={UserList} />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;
