import React from 'react';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.scss';

export const Layout = (): JSX.Element => {
    return (
        <div className={styles['app-wrapper']}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
