import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Rating.module.scss';

interface IRating
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    appearance?: 'small' | 'large';
    className?: string;
    value: number | 'null';
}

export const Rating: FC<IRating> = ({
    appearance = 'small',
    value,
}): JSX.Element => {
    let quality: string = '';
    if (value === 'null') quality = 'null';
    if (value > 7) quality = 'high';
    if (value < 7 && value > 5) quality = 'mid';
    if (value < 5) quality = 'low';

    return (
        <span
            className={cn(styles.rating, styles[appearance], {
                [styles[`rating-${quality}`]]: quality,
            })}
        >
            {value !== 'null' ? value : 'Нет рейтинга'}
        </span>
    );
};
