import React, { useEffect, useState } from 'react';
import { Title } from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { getMoviesByFilterParams } from '../../API/api';
import { searchParams } from '../../utils/utils';
import { IFilteredFilms } from '../../types/types';
import { Card } from '../../components/Card/Card';
import { RectButton } from '../../components/RectButton/RectButton';

export const Home = (): JSX.Element => {
    const [popularNow, setPopularNow] = useState<IFilteredFilms[]>([]);

    useEffect(() => {
        getMoviesByFilterParams(searchParams)
            .then((res) => {
                const films = res.items.slice(0, 6);
                setPopularNow(films);
            })
            .catch((e) => console.log('error', e));
    }, []);

    return (
        <div className={styles['home-page']}>
            <div className={styles.inner}>
                <div className={styles['intro-block']}>
                    <Title className={styles.title} appearance="page">
                        Online cinema
                    </Title>
                    <p className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Accusamus aliquid, aperiam aspernatur assumenda
                        consequatur culpa dolorem doloribus earum impedit iste,
                        molestias nam nemo officia quaerat quidem reiciendis,
                        reprehenderit tempora vel.
                    </p>
                </div>
                <div className={styles['links-wrap']}>
                    <Link className={styles.link} to="/tops/top250">
                        Топ 250
                    </Link>
                    <Link className={styles.link} to="/tops/top100">
                        Топ 100
                    </Link>
                    <Link className={styles.link} to="/tops/awaited">
                        Ожидаемые
                    </Link>
                    <Link className={styles.link} to="movies">
                        Все фильмы
                    </Link>
                </div>
                <div>
                    <Title className={styles.title} appearance="block">
                        Популярное сейчас
                    </Title>
                    <ul className={styles['popular-list']}>
                        {popularNow.map(
                            ({
                                kinopoiskId,
                                nameRu,
                                nameOriginal,
                                posterUrlPreview,
                            }) => {
                                return (
                                    <li key={kinopoiskId}>
                                        <Link to={`/film/${kinopoiskId}`}>
                                            <Card
                                                image={posterUrlPreview}
                                                title={nameRu}
                                                appearance="film-lite"
                                            />
                                        </Link>
                                    </li>
                                );
                            },
                        )}
                    </ul>
                    <Link className={styles.link} to="movies">
                        <RectButton>Больше фильмов</RectButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};
