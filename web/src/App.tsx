import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import routes from './constant/routes.json';
import defaultTheme from './theme';
import ComingSoon from './views/ComingSoon/ComingSoon';
import Login from './views/Login/Login';
import NotFound from './views/NotFound/NotFound';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={routes.LOGIN} component={Login} />
                    <Header>
                        <Switch>
                            <Route exact path={routes.HOME}>
                                <ComingSoon time={new Date(1632326400000)} />
                            </Route>
                            <Route exact path={routes.DASHBOARD}>
                                <ComingSoon time={new Date(1632326400000)} />
                            </Route>
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Header>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
