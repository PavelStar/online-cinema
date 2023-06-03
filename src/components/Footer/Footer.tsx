import React from 'react';
import { Logo } from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = (): JSX.Element => {
    const setActive = ({ isActive }: { isActive: boolean }): string =>
        isActive ? styles['active-link'] : undefined;

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <ul className={styles['menu-list']}>
                    <li>
                        <NavLink className={setActive} to="/tops/top100">
                            Подборки
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={setActive} to="/movies">
                            Все фильмы
                        </NavLink>
                    </li>
                </ul>
                <Logo size="s" />
            </div>
        </footer>
    );
};
