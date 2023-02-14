import React from 'react';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';

export const Layout = (): JSX.Element => {
    return (
        <>
            <Header />
            <Outlet />
            <footer>Footer</footer>
        </>
    );
};
