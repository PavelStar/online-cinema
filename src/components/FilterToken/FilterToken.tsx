import React, { FC, ReactNode } from 'react';
import styles from './FilterToken.module.scss';
import CrossIcon from '../../assets/cross-icon.svg';
import cn from 'classnames';

interface IFilterToken {
    children: ReactNode | string;
    isActive?: boolean;
    onCloseBtnClick: () => void;
}

export const FilterToken: FC<IFilterToken> = ({
    children,
    onCloseBtnClick,
}) => {
    return (
        <div className={cn(styles['filter-token'])}>
            {children}
            <button
                className={styles.btn}
                type="button"
                onClick={onCloseBtnClick}
            >
                <CrossIcon className={styles.icon} />
            </button>
        </div>
    );
};
