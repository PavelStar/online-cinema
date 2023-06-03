import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getFilmById, getSimilarFilms, getStaffByFilmId } from '../../API/api';
import { IFilmExtended, IPerson, ISimilarFilms } from '../../types/types';
import { Rating } from '../../components/Rating/Rating';
import { Link, useParams } from 'react-router-dom';
import { Title } from '../../components/Title/Title';
import { RectButton } from '../../components/RectButton/RectButton';
import { HorizontalList } from '../../components/HorizontalList/HorizontalList';
import { Card } from '../../components/Card/Card';
import styles from './Film.module.scss';

export const Film = (): JSX.Element => {
    const [film, setFilm] = useState<IFilmExtended | null>(null);
    const [filmStaff, setFilmStaff] = useState<IPerson[]>();
    const [allSimilarFilms, setAllSimilarFilms] = useState<{
        total: number;
        items: ISimilarFilms[];
    } | null>(null);
    const [similarFilms, setSimilarFilms] = useState<ISimilarFilms[] | null>(
        null,
    );
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getFilmById(id)
                .then((res) => {
                    console.log(res);
                    setFilm(res);
                })
                .catch((e) => console.log(e));

            getStaffByFilmId(id)
                .then((res) => {
                    setFilmStaff(res);
                })
                .catch((e) => console.log(e));

            getSimilarFilms(id)
                .then((res) => {
                    setAllSimilarFilms(res);
                })
                .catch((e) => console.log(e));
        }
    }, [id]);

    useEffect(() => {
        if (allSimilarFilms) {
            setSimilarFilms(() => allSimilarFilms.items.slice(0, 7));
        }
    }, [allSimilarFilms]);

    const loadMoreSimilarFilms = (): void => {
        const filmsToShow = 7;
        const lastIndex = similarFilms?.length;

        if (allSimilarFilms && allSimilarFilms?.total > filmsToShow) {
            if (similarFilms && lastIndex) {
                const arrCopy = similarFilms.concat(
                    allSimilarFilms.items.slice(
                        lastIndex,
                        lastIndex + filmsToShow,
                    ),
                );
                setSimilarFilms(arrCopy);
            }
        }
    };

    const hideAllSimilarFilms = (): void => {
        if (allSimilarFilms)
            setSimilarFilms(allSimilarFilms?.items.slice(0, 7));
    };

    const setFilmBackground = (
        film: IFilmExtended | null,
    ): { background: string } => {
        const gradientOne =
            'linear-gradient(90deg, #141936 0%, #141936 40%, rgba(0,0,0,0) 60%)';
        const gradientTwo =
            'linear-gradient(0deg, #141936 0%, #141936 10%, rgba(0,0,0,0) 48%)';
        const bgImg = film
            ? `right -100px / 60% auto no-repeat url(${
                  film?.coverUrl || film.posterUrl
              })`
            : '';

        return {
            background: `${gradientOne}, ${gradientTwo}, ${bgImg}`,
        };
    };

    const getMainStaff = (personsList: IPerson[]): IPerson[] | null => {
        if (personsList.length) {
            const directors = personsList
                ?.filter(({ professionText }) => {
                    return professionText === 'Режиссеры';
                })
                .slice(0, 1);
            const actors = personsList
                ?.filter(({ professionText }) => {
                    return professionText === 'Актеры';
                })
                .slice(0, 5);
            return [...directors, ...actors];
        }
        return null;
    };

    return (
        <div className={styles['film-page']}>
            <div
                className={styles['film-info']}
                style={setFilmBackground(film)}
            >
                <div className={cn(styles.inner, styles['film-container'])}>
                    {film ? (
                        <>
                            <div className={styles['rating-block']}>
                                <Rating
                                    className={styles.rating}
                                    ratingValue={
                                        film.ratingKinopoisk ||
                                        `${film.ratingAwait}%`
                                    }
                                    appearance="extended"
                                />
                            </div>
                            <div className={styles['header-block']}>
                                <div className={styles['titles-block']}>
                                    <Title
                                        className={styles['film-title']}
                                        appearance="page"
                                    >
                                        {film?.nameRu}
                                    </Title>
                                    <span className={styles['original-name']}>
                                        {film.nameOriginal}({film.year})
                                    </span>
                                    <p className={styles['short-description']}>
                                        {film.shortDescription}
                                    </p>
                                </div>
                            </div>

                            <div className={styles['about-block']}>
                                <ul className={styles['details-list']}>
                                    <li className={styles['details-item']}>
                                        <span
                                            className={
                                                styles['details-item-title']
                                            }
                                        >
                                            Страна
                                        </span>
                                        <HorizontalList data={film.countries} />
                                    </li>
                                    <li className={styles['details-item']}>
                                        <span
                                            className={
                                                styles['details-item-title']
                                            }
                                        >
                                            Жанр
                                        </span>
                                        <HorizontalList data={film.genres} />
                                    </li>
                                    <li className={styles['details-item']}>
                                        <span
                                            className={
                                                styles['details-item-title']
                                            }
                                        >
                                            Время
                                        </span>
                                        <p>136 мин.</p>
                                    </li>
                                </ul>
                                <p className={styles.description}>
                                    {film?.description}
                                </p>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            {filmStaff?.length ? (
                <div className={styles['staff-block']}>
                    <Title appearance="block">Режиссеры, актеры</Title>
                    <ul className={styles['staff-list']}>
                        {getMainStaff(filmStaff)?.map(
                            ({ nameRu, posterUrl, professionText }, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={styles['staff-item']}
                                    >
                                        <Card
                                            image={posterUrl}
                                            title={nameRu}
                                            subtitle={professionText}
                                        />
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </div>
            ) : null}
            {allSimilarFilms?.total ? (
                <div className={styles['similar-films-block']}>
                    <Title
                        className={styles['similar-films-title']}
                        appearance="block"
                    >
                        Похожие фильмы
                    </Title>
                    <ul className={styles['similar-list']}>
                        {similarFilms?.map((film) => {
                            return (
                                <li key={film.filmId}>
                                    <Link to={`/film/${film.filmId}`}>
                                        <Card
                                            key={film.filmId}
                                            appearance="film-lite"
                                            image={film.posterUrlPreview}
                                            title={film.nameRu}
                                            subtitle={film.nameEn}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    {allSimilarFilms &&
                        allSimilarFilms.total > 7 &&
                        allSimilarFilms.items.length !==
                            similarFilms?.length && (
                            <RectButton onClick={loadMoreSimilarFilms}>
                                Еще
                            </RectButton>
                        )}
                    {allSimilarFilms &&
                        allSimilarFilms?.total > 7 &&
                        allSimilarFilms?.items.length ===
                            similarFilms?.length && (
                            <div>
                                <RectButton onClick={hideAllSimilarFilms}>
                                    Скрыть
                                </RectButton>
                                <RectButton>Больше фильмов</RectButton>
                            </div>
                        )}
                </div>
            ) : null}
        </div>
    );
};
