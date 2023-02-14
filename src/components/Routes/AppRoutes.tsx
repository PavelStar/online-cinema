import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Movies } from '../../pages/Movies/Movies';
import { Film } from '../../pages/Film/Film';
import { NotFound } from '../../pages/NotFound/NotFound';

export const AppRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<div>home page</div>} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/film" element={<Film />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
