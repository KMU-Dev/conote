import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

history.listen((location) => {
    gtag('set', 'page_path', location.pathname + location.search);
});
