import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './constant/routes.json';
import Login from './views/Login/Login';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routes.LOGIN} component={Login} />
                <Switch>

                </Switch>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
