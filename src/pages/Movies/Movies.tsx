import React, { useEffect, useState } from 'react';
import { Title } from '../../components/Title/Title';
import { FilmCard } from '../../components/FilmCard/FilmCard';
import { getMoviesByFilterParams, getTops } from '../../API/api';
import { IFilteredFilmsResponse, OrderType } from '../../types/types';
import Select, { IOption } from '../../components/Select/Select';
import Arrow from '../../assets/arrow-stroked.svg';
import { IconButton } from '../../components/IconButton/IconButton';
import { FilmsListLoader } from '../../components/Loaders/FilmsListLoader';
import { RectButton } from '../../components/RectButton/RectButton';
import { orderData } from '../../utils/utils';
import styles from './Movies.module.scss';
import { FilterSidePanel } from '../../components';
import { FilterTokensList } from '../../components/FilterTokensList/FilterTokensList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    resetSearchParams,
    setOrder,
    setPage,
    setSelectedOrder,
} from '../../store/FilterEntitiesSlice';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { Card } from '../../components/Card/Card';

export const Movies = (): JSX.Element => {
    const [movies, setMovies] = useState<IFilteredFilmsResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGoToTopBtnShown, setIsGoToTopBtnShown] = useState(false);
    const [isResetBtnShown, setIsResetBtnShown] = useState(false);
    const [pageTitle, setPageTitle] = useState('Все фильмы');

    const { top100, top250, awaited } = useParams();

    const getPageTitle = (): void => {
        console.log('getPageTitle', top100, top250, awaited);
        if (top100) {
            setPageTitle('Топ-100 фильмов');
            console.log('100');
        }
        if (top250) {
            console.log('250');
            setPageTitle('Топ-250 фильмов');
        }
        if (awaited) setPageTitle('Топ ожидаемых фильмов');
    };

    useEffect(() => {
        getTops()
            .then((res) => console.log(res))
            .catch((e) => console.log('error', e));
        if (top100) {
            getTops('TOP_100_POPULAR_FILMS')
                .then((res) => console.log(res))
                .catch((e) => console.log('error', e));
        }
        if (top250) {
            getTops('TOP_250_BEST_FILMS')
                .then((res) => console.log(res))
                .catch((e) => console.log('error', e));
        }
        if (top250) {
            getTops('TOP_AWAIT_FILMS')
                .then((res) => console.log(res))
                .catch((e) => console.log('error', e));
        }
        getPageTitle();
        console.log('top100, top250, awaited');
    }, [top100, top250, awaited]);

    const searchParamsState = useSelector(
        (state: RootState) => state.filterEntitiesSlice,
    );
    const { searchParams, selectedOrder } = searchParamsState;
    const dispatch = useDispatch();

    useEffect(() => {
        const countScrollY = (): void => {
            if (window.scrollY > 500) {
                setIsGoToTopBtnShown(true);
            } else {
                setIsGoToTopBtnShown(false);
            }
        };
        document.addEventListener('scroll', countScrollY);

        return () => {
            document.removeEventListener('scroll', countScrollY);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getMoviesByFilterParams(searchParams)
            .then((res) => {
                console.log(res.items);
                setMovies(res);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
        showResetBtn();
    }, [searchParams]);

    const onPageChange = (pageNum: number): void => {
        // setFilterParams({ ...filterParams, page: pageNum + 1 });
        dispatch(setPage(pageNum + 1));
    };

    const scrollToTop = (): void => {
        window.scroll({ top: 0 });
        setIsGoToTopBtnShown(false);
    };

    const onOrderChange = (orderType: IOption): void => {
        let order: OrderType | null = null;
        if (orderType.value === 'По новизне') order = 'YEAR';
        if (orderType.value === 'Много оценок') order = 'NUM_VOTE';
        if (orderType.value === 'Высокий рейтинг') order = 'RATING';
        dispatch(setOrder(order));
        dispatch(setSelectedOrder(orderType));
    };

    const showResetBtn = (): boolean => {
        const res: boolean = Object.entries(searchParams)
            .filter((item) => item[0] !== 'page')
            .some((item) => {
                return item[1] !== null;
            });
        setIsResetBtnShown(res);
        return res;
    };

    const onResetBtnClick = (): void => {
        dispatch(resetSearchParams(null));
        setIsResetBtnShown(false);
    };

    return (
        <div className={styles['movies-page']}>
            <div className={styles.inner}>
                <Title className={styles['page-title']} appearance="page">
                    {pageTitle}
                </Title>
                <div className={styles.wrapper}>
                    <FilterSidePanel />
                    <div className={styles['top-panel']}>
                        {isResetBtnShown && (
                            <RectButton
                                className={styles['reset-btn']}
                                appearance="stroked"
                                onClick={onResetBtnClick}
                            >
                                Сбросить фильтры
                            </RectButton>
                        )}
                        <Select
                            wrapClassName={styles['sort-select']}
                            selectedOption={selectedOrder}
                            options={orderData}
                            onOptionChange={(option) => onOrderChange(option)}
                        />
                        {movies ? (
                            <Pagination
                                // className={styles.pagination}
                                pagesCount={5} // 5 т к в остальных случаях нет результатов
                                onChange={onPageChange}
                                currentPage={searchParams.page - 1}
                            />
                        ) : null}
                        <FilterTokensList />
                    </div>
                    <div className={styles.content}>
                        {isLoading ? (
                            <FilmsListLoader />
                        ) : (
                            <ul className={styles['movies-list']}>
                                {movies?.items.map(
                                    ({
                                        kinopoiskId,
                                        posterUrlPreview,
                                        nameRu,
                                        nameOriginal,
                                        year,
                                        ratingKinopoisk,
                                        genres,
                                        countries,
                                        type,
                                    }) => {
                                        return (
                                            <li key={kinopoiskId}>
                                                <Link
                                                    to={`/film/${kinopoiskId}`}
                                                    className={
                                                        styles['card-link']
                                                    }
                                                >
                                                    <Card
                                                        appearance="film-extended"
                                                        image={posterUrlPreview}
                                                        title={nameRu}
                                                        subtitle={nameOriginal}
                                                        year={year}
                                                        rating={ratingKinopoisk}
                                                        genres={genres}
                                                        countries={countries}
                                                        filmType={type}
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    },
                                )}
                            </ul>
                        )}
                        {isGoToTopBtnShown && (
                            <IconButton
                                onClick={scrollToTop}
                                className={styles['go-to-top']}
                                icon={<Arrow />}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
