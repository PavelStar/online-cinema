import React, { useEffect, useState } from 'react';
import { Title } from '../../components/Title/Title';
import { Link, useMatch } from 'react-router-dom';
import styles from './Collections.module.scss';
import { getTops } from '../../API/api';
import { IFilmFromTop, TopType } from '../../types/types';
import { Card } from '../../components/Card/Card';
import { TabList } from '../../components/TabList/TabList';
import { Pagination } from '../../components/Pagination/Pagination';

export const Collections = (): JSX.Element => {
    const [currentPage, setCurrentPage] = useState(0);
    const match = useMatch('/tops/:topName');
    const [topData, setTopData] = useState<{
        pagesCount: number;
        films: IFilmFromTop[];
    }>();
    const [currentTab, setCurrentTab] = useState<number | undefined>();

    const getTopNameToRequest = (): TopType | undefined => {
        const topName = match?.params.topName;
        if (topName === 'top100') {
            return 'TOP_100_POPULAR_FILMS';
        }
        if (topName === 'top250') {
            return 'TOP_250_BEST_FILMS';
        }
        if (topName === 'awaited') {
            return 'TOP_AWAIT_FILMS';
        }
    };

    const tabListData = [
        { id: 1, value: 'Топ-100', url: 'top100' },
        { id: 2, value: 'Топ-250', url: 'top250' },
        { id: 3, value: 'Ожидаемые', url: 'awaited' },
    ];

    const changeTopUrl = (id: number): void => {
        if (id) {
            setCurrentTab(id);
        }
    };

    useEffect(() => {
        const paramTopName = getTopNameToRequest();
        getTops(paramTopName, 1)
            .then((res) => {
                // неверно отображается pagesCount в ответе
                if (paramTopName === 'TOP_100_POPULAR_FILMS') {
                    const top100Res = { ...res, pagesCount: 20 };
                    setTopData(top100Res);
                    changeTopUrl(1);
                    setCurrentPage(0);
                }
                if (paramTopName === 'TOP_250_BEST_FILMS') {
                    setTopData(res);
                    changeTopUrl(2);
                    setCurrentPage(0);
                }
                if (paramTopName === 'TOP_AWAIT_FILMS') {
                    setTopData(res);
                    changeTopUrl(3);
                    setCurrentPage(0);
                }
            })
            .catch(() => console.log('error'));
    }, [match]);

    const onPageChange = (pageNum: number): void => {
        getTops(getTopNameToRequest(), pageNum + 1)
            .then((res) => {
                if (getTopNameToRequest() === 'TOP_100_POPULAR_FILMS') {
                    const top100Res = { ...res, pagesCount: 20 };
                    setTopData(top100Res);
                    setCurrentPage(pageNum);
                } else {
                    setTopData(res);
                    setCurrentPage(pageNum);
                }
            })
            .catch(() => console.log('error'));
    };

    useEffect(() => {}, [topData]);

    return (
        <div className={styles.collections}>
            <Title appearance="page">Подборки</Title>
            <div className={styles.inner}>
                <div className={styles['navigation-block']}>
                    <TabList
                        data={tabListData}
                        currentTab={currentTab}
                        onTabClick={changeTopUrl}
                    />
                </div>
                {topData?.pagesCount && topData?.pagesCount > 1 ? (
                    <Pagination
                        className={styles.pagination}
                        pagesCount={topData.pagesCount}
                        onChange={onPageChange}
                        currentPage={currentPage}
                    />
                ) : null}
                <ul className={styles['content-block']}>
                    {topData?.films.map((film) => {
                        return (
                            <li key={film.filmId}>
                                <Link to={`/film/${film.filmId}`}>
                                    <Card
                                        appearance="film-lite"
                                        image={film.posterUrl}
                                        title={film.nameRu}
                                        subtitle={film.nameEn}
                                        rating={film.rating}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
