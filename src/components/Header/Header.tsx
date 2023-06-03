import React, { FC } from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import { Search } from '../Search/Search';
import { UserNavigation } from '../UserNavigation/UserNavigation';
import '../../styles/variables.scss';
import { Logo } from '../Logo/Logo';

export const Header: FC = (): JSX.Element => {
    return (
        <header className={cn(styles['main-header'])}>
            <div className={styles.inner}>
                <div className={styles['left-col']}>
                    <Menu />
                    <Logo />
                </div>
                <div className={styles['right-col']}>
                    <Search />
                    <UserNavigation />
                </div>
            </div>
        </header>
    );
};
