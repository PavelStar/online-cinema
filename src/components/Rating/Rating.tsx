import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Rating.module.scss';

interface IRating {
    appearance?: 'simple-small' | 'simple' | 'extended';
    votesValue?: number;
    className?: string;
    ratingValue: number | string | 'null';
}

export const Rating: FC<IRating> = ({
    appearance = 'simple',
    votesValue,
    className,
    ratingValue,
}): JSX.Element => {
    let quality: string = '';
    if (ratingValue === 'null') quality = 'null';
    if (ratingValue >= 7) quality = 'high';
    if (ratingValue < 7 && ratingValue > 5) quality = 'mid';
    if (ratingValue <= 5) quality = 'low';

    const isAwaitRating = ratingValue?.toString().match('%');

    return (
        <div
            className={cn(
                styles.rating,
                { [styles[`${appearance}`]]: appearance },
                className,
            )}
        >
            <span
                className={cn(styles['num-value'], {
                    [styles[`${quality}`]]: quality,
                    [styles['await-value']]: isAwaitRating,
                })}
            >
                {ratingValue !== 'null'
                    ? isAwaitRating
                        ? `Рейтинг ожидания ${ratingValue}`
                        : ratingValue
                    : 'Нет рейтинга'}
            </span>
            {appearance === 'extended' && votesValue != null && (
                <span className={styles.votes}>Отзывы: {votesValue}</span>
            )}
        </div>
    );
};
