import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Title.module.scss';

interface ITitle {
    appearance?:
        | 'page'
        | 'section'
        | 'block'
        | 'block-small'
        | 'item'
        | 'item-small';
    children: string;
    className?: string;
}

export const Title: FC<ITitle> = ({
    appearance = 'item',
    children,
    className = '',
}): JSX.Element => {
    const titleClassName = cn(className, styles.title, styles[`${appearance}`]);

    switch (appearance) {
        case 'page':
            return <h1 className={titleClassName}>{children}</h1>;
        case 'section':
            return <h2 className={titleClassName}>{children}</h2>;
        case 'block':
            return <h3 className={titleClassName}>{children}</h3>;
        case 'block-small':
            return <h3 className={titleClassName}>{children}</h3>;
        case 'item':
            return <h4 className={titleClassName}>{children}</h4>;
        case 'item-small':
            return <h4 className={titleClassName}>{children}</h4>;
    }
};
