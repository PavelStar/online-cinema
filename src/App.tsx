import React from 'react';
import './styles/global.scss';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Movies } from './pages/Movies/Movies';
import { Film } from './pages/Film/Film';
import { NotFound } from './pages/NotFound/NotFound';
import { Collections } from './pages/Collections/Collections';
import { Home } from './pages/Home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'movies',
                element: <Movies />,
            },
            {
                path: 'tops',
                element: <Collections />,
                children: [
                    {
                        path: 'top100',
                        element: <div>100</div>,
                    },
                    {
                        path: 'top250',
                        element: <div>250</div>,
                    },
                    {
                        path: 'awaited',
                        element: <div>awaited</div>,
                    },
                ],
            },
            {
                path: 'film/:id',
                element: <Film />,
            },
        ],
    },
]);

export const App = (): JSX.Element => {
    return <RouterProvider router={router} />;
};

export default App;
