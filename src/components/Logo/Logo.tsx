import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import cn from 'classnames';

interface ILogo {
    size?: 's' | 'l';
}

export const Logo: FC<ILogo> = ({ size = 'l' }): JSX.Element => {
    return (
        <Link to="/" className={cn(styles['logo-link'], styles[`${size}`])}>
            Online cinema
        </Link>
    );
};
