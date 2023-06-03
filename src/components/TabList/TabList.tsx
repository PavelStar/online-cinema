import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './TabList.module.scss';

interface ITabList {
    data: Array<{ id: number; value: string; url?: string }>;
    currentTab: number | undefined;
    onTabClick: (id: number) => void;
    isHorizontal?: boolean;
}

export const TabList: FC<ITabList> = ({
    data,
    currentTab,
    onTabClick,
    isHorizontal = false,
}): JSX.Element => {
    const isTabActive = (id: number): string | null => {
        if (id === currentTab) {
            return styles.active;
        }
        return null;
    };

    return (
        <ul
            className={cn(styles['tab-list'], {
                [styles.horizontal]: isHorizontal,
            })}
        >
            {data.map(({ id, value, url }) => {
                return (
                    <li key={id} className={styles.tab}>
                        {url ? (
                            <Link
                                to={url}
                                className={cn(
                                    styles['tab-text'],
                                    isTabActive(id),
                                )}
                                onClick={() => onTabClick(id)}
                            >
                                {value}
                            </Link>
                        ) : (
                            <span
                                className={cn(
                                    styles['tab-text'],
                                    isTabActive(id),
                                )}
                                onClick={() => onTabClick(id)}
                            >
                                {value}
                            </span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
