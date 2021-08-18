import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import PageRoute from './components/Page/PageRoute';
import routes from './constant/routes.json';
import defaultTheme from './theme';
import ComingSoon from './views/ComingSoon/ComingSoon';
import Login from './views/Login/Login';
import NotFound from './views/NotFound/NotFound';
import VideoUpload from './views/VideoUpload/VideoUpload';

function App() {
    return (
        <HelmetProvider>
            <ThemeProvider theme={defaultTheme}>
                <BrowserRouter>
                    <Switch>    
                        <PageRoute exact path={routes.LOGIN} component={Login} title="登入" />
                        <Header>
                            <Switch>
                                <PageRoute exact path={routes.HOME} title="首頁">
                                    <ComingSoon time={new Date(1632326400000)} />
                                </PageRoute>
                                <PageRoute exact path={routes.DASHBOARD} title="總覽">
                                    <ComingSoon time={new Date(1632326400000)} />
                                </PageRoute>
                                <PageRoute
                                    exact
                                    path={routes.VIDEO_UPLOAD}
                                    component={VideoUpload}
                                    title="上傳影片"
                                />
                                <Route path="*" component={NotFound} />
                            </Switch>
                        </Header>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
