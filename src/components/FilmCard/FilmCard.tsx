import React, { FC } from 'react';
import cn from 'classnames';
import {
    IFilmByKeyword,
    IFilteredFilms,
    ISimilarFilms,
} from '../../types/types';
import { Title } from '../Title/Title';
import { Rating } from '../Rating/Rating';
import { RectButton } from '../RectButton/RectButton';
import { HorizontalList } from '../HorizontalList/HorizontalList';
import { Link } from 'react-router-dom';
import styles from './FilmCard.module.scss';
import { setTypeOfFilm } from '../../utils/utils';

type DataType = IFilteredFilms | IFilmByKeyword | ISimilarFilms;

interface IFilmCard {
    appearance?: 'lite' | 'extended';
    data: DataType;
}

export const FilmCard: FC<IFilmCard> = ({
    appearance = 'lite',
    data,
}): JSX.Element => {
    const filteredFilmsGuard = (obj: DataType): obj is IFilteredFilms => {
        return (obj as IFilteredFilms).kinopoiskId !== undefined;
    };

    const setFilmId = (data: DataType): number => {
        if (filteredFilmsGuard(data)) {
            return data.kinopoiskId;
        }
        return data.filmId;
    };

    const setFilmNameOrig = (data: DataType): string => {
        if (filteredFilmsGuard(data)) {
            return data.nameOriginal;
        }
        return data.nameEn;
    };

    const setFilmYear = (data: DataType): number | null => {
        if (filteredFilmsGuard(data)) {
            return data.year;
        }
        return null;
    };

    const setFilmRating = (data: DataType): number | 'null' => {
        if (filteredFilmsGuard(data)) {
            return data.ratingKinopoisk;
        }
        return 'null';
    };

    return (
        <div className={cn(styles['film-card'], styles[`${appearance}`])}>
            <Link
                to={`/film/${setFilmId(data)}`}
                className={styles['img-link-block']}
            >
                <img
                    className={styles.img}
                    src={data.posterUrlPreview}
                    alt={data.nameRu}
                />
            </Link>
            <div className={styles['info-block']}>
                <Link
                    to={`/film/${setFilmId(data)}`}
                    className={styles['titles-link-block']}
                >
                    <Title className={styles.title} appearance="item">
                        {data.nameRu}
                    </Title>
                    <span className={styles['orig-title']}>
                        {setFilmNameOrig(data)}({setFilmYear(data)})
                    </span>
                </Link>
                {appearance === 'extended' && (
                    <div className={styles.info}>
                        {filteredFilmsGuard(data) && (
                            <span
                                className={cn(
                                    styles['type-label'],
                                    styles[
                                        `${data.type
                                            .toLowerCase()
                                            .replace('_', '-')}`
                                    ],
                                )}
                            >
                                {setTypeOfFilm(data.type)}
                            </span>
                        )}
                        <div className={styles.countries}>
                            {filteredFilmsGuard(data) && (
                                <HorizontalList
                                    className={styles['countries-list']}
                                    data={data.countries}
                                />
                            )}
                        </div>
                        <div className={styles.genre}>
                            {filteredFilmsGuard(data) && (
                                <HorizontalList
                                    className={styles['genres-list']}
                                    data={data.genres}
                                />
                            )}
                        </div>
                    </div>
                )}
                {appearance !== 'lite' && (
                    <>
                        <RectButton className={styles.btn}>
                            Буду смотреть
                        </RectButton>
                        {setFilmRating(data) !== 'null' && (
                            <Rating
                                className={styles.rating}
                                ratingValue={setFilmRating(data)}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
