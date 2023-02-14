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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<div>Home page</div>} />
            <Route path="movies" element={<Movies />} />
            <Route path="film" element={<Film />} />
            <Route path="*" element={<NotFound />} />
        </Route>,
    ),
);

const App = (): JSX.Element => {
    return <RouterProvider router={router} />;
};

export default App;
