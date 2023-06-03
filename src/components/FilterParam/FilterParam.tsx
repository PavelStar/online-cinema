import React, { FC, ReactNode } from 'react';
import styles from './FilterParam.module.scss';
import cn from 'classnames';

interface IFilterParam {
    children: ReactNode;
    isActive?: boolean;
    onClick: () => void;
}

export const FilterParam: FC<IFilterParam> = ({
    children,
    isActive = false,
    onClick,
}) => {
    return (
        <button
            className={cn(styles['filter-param'], {
                [styles.active]: isActive,
            })}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
