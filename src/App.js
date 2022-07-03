import React from 'react';
import {Router} from './router';
import {BrowserRouter} from 'react-router-dom';

export const App = () => {
    return (
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    );
};
