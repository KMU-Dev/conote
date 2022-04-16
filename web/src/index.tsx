import React from 'react';
import { createRoot } from 'react-dom/client';
import 'reflect-metadata';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './Root';

const root = createRoot(document.getElementById('root'));

// Opt out StrictMode since @apollo/client doesn't support react v18
/* root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
); */
root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
