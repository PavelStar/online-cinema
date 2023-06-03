import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '../../assets/search-icon.svg';
import { Input } from '../Input/Input';
import { IconButton } from '../IconButton/IconButton';
import { Rating } from '../Rating/Rating';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { IFilmByKeyword } from '../../types/types';
import { getFilms } from '../../API/api';
import { useDebounce } from '../../hooks/useDebounce';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';

export const Search = (): JSX.Element => {
    const [isInputShown, setIsInputShown] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const debouncedValue = useDebounce(inputValue, 300);
    const [isResultsShown, setIsResultsShown] = useState(false);
    const [data, setData] = useState<IFilmByKeyword[]>();

    const searchRef = useRef<HTMLDivElement | null>(null);
    const resultsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (inputValue === '') {
            setIsResultsShown(false);
            setData(undefined);
        } else {
            setIsResultsShown(true);
        }
    }, [inputValue]);

    useEffect(() => {
        if (inputValue !== '') {
            getFilms(inputValue)
                .then((res) => setData(res))
                .catch((err) => console.log(err));
        }
    }, [debouncedValue]);

    useOutsideClick(resultsRef, () => {
        setIsResultsShown(false);
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData(undefined);
        setInputValue(e.target.value);
    };

    const showInput = (): void => {
        setIsInputShown(!isInputShown);
    };

    return (
        <div className={styles.search} ref={searchRef}>
            <Input
                value={inputValue}
                placeholder="Поиск по фильмам"
                onChange={onInputChange}
            />
            <IconButton
                className={styles['search-btn']}
                icon={<SearchIcon />}
                onClick={showInput}
            />
            {isResultsShown && data !== undefined && (
                <DropdownMenu ref={resultsRef}>
                    <ul className={styles['results-list']}>
                        {data?.map((item) => {
                            const {
                                filmId,
                                nameRu,
                                rating,
                                posterUrlPreview,
                                nameEn,
                            } = item;
                            return (
                                <li className={styles.film} key={filmId}>
                                    <Link
                                        to={`/film/${filmId}`}
                                        className={styles['film-link']}
                                        onClick={() => setIsResultsShown(false)}
                                    >
                                        <img
                                            className={styles['film-img']}
                                            src={posterUrlPreview}
                                            alt={nameRu}
                                        />
                                        <span
                                            className={styles['film-name-ru']}
                                        >
                                            {nameRu}
                                        </span>
                                        <span
                                            className={styles['film-name-en']}
                                        >
                                            {nameEn}
                                        </span>
                                        <Rating
                                            ratingValue={rating}
                                            appearance="simple-small"
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </DropdownMenu>
            )}
        </div>
    );
};
