import React, { FC } from 'react';
import cn from 'classnames';
import { Title } from '../Title/Title';
import { Rating } from '../Rating/Rating';
import { HorizontalList } from '../HorizontalList/HorizontalList';
import { ICountry, IGenre, ItemType } from '../../types/types';
import { RectButton } from '../RectButton/RectButton';
import { setTypeOfFilm } from '../../utils/utils';
import styles from './Card.module.scss';

interface ICard {
    appearance?:
        | 'person'
        | 'film-lite'
        | 'film-extended'
        | 'similar-film'
        | 'film-search-result';
    image: string;
    title: string;
    subtitle?: string;
    year?: number;
    rating?: number | string;
    countries?: ICountry[];
    genres?: IGenre[];
    filmType?: ItemType;
}

export const Card: FC<ICard> = ({
    appearance = 'person',
    image,
    title,
    subtitle,
    year,
    rating,
    countries,
    genres,
    filmType,
}): JSX.Element => {
    const isPerson = appearance === 'person' ? 'item-small' : 'item';

    return (
        <div className={cn(styles.card, styles[`${appearance}-card`])}>
            <div className={styles['img-wrap']}>
                <img className={styles.img} src={image} alt={title} />
            </div>
            <div className={styles['text-wrap']}>
                <div className={styles['titles-block']}>
                    {title && (
                        <Title className={styles.title} appearance={isPerson}>
                            {title}
                        </Title>
                    )}
                    <p className={styles.subtitle}>
                        {subtitle} {year && <span>({year})</span>}
                    </p>
                </div>
                {countries && genres ? (
                    <div className={styles['lists-block']}>
                        <HorizontalList
                            className={styles['countries-list']}
                            data={countries}
                        />
                        <HorizontalList
                            className={styles['genres-list']}
                            data={genres}
                        />
                    </div>
                ) : null}
                {appearance === 'film-extended' && (
                    <>
                        {filmType ? (
                            <span
                                className={cn(
                                    styles['film-type-label'],
                                    styles[
                                        `${filmType
                                            .toLowerCase()
                                            .replace('_', '-')}`
                                    ],
                                )}
                            >
                                {setTypeOfFilm(filmType)}
                            </span>
                        ) : null}
                        <RectButton>Подробнее</RectButton>
                    </>
                )}
            </div>
            {rating && (
                <Rating
                    className={cn(
                        styles.rating,
                        appearance === 'film-lite'
                            ? styles['rating-on-card']
                            : null,
                    )}
                    ratingValue={rating}
                />
            )}
        </div>
    );
};
