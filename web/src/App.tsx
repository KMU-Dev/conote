import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import routes from './constant/routes.json';
import defaultTheme from './theme';
import Login from './views/Login/Login';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={routes.LOGIN} component={Login} />
                    <Header>
                        <Switch>

                        </Switch>
                    </Header>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
