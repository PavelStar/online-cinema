import React, { FC } from 'react';
import { FilterToken } from '../FilterToken/FilterToken';
import { FilterParamType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
    setCountryId,
    setGenreId,
    setSelectedCountry,
    setSelectedFilmType,
    setSelectedGenre,
    setType,
} from '../../store/FilterEntitiesSlice';
import styles from './FilterTokensList.module.scss';

export const FilterTokensList: FC = (): JSX.Element => {
    const searchParamsState = useSelector(
        (state: RootState) => state.filterEntitiesSlice,
    );
    const dispatch = useDispatch<AppDispatch>();
    const {
        searchParams: { countryId, genreId },
        selectedCountry,
        selectedGenre,
        selectedFilmType,
    } = searchParamsState;

    const handleChange = (action: FilterParamType): void => {
        if (action === 'genre') {
            dispatch(setGenreId(null));
            dispatch(setSelectedGenre(null));
        }
        if (action === 'country') {
            dispatch(setCountryId(null));
            dispatch(setSelectedCountry(null));
        }
        if (action === 'type') {
            dispatch(setType(null));
            dispatch(setSelectedFilmType(null));
        }
    };

    return (
        <div className={styles['tokens-block']}>
            {genreId && (
                <FilterToken onCloseBtnClick={() => handleChange('genre')}>
                    {selectedGenre.value}
                </FilterToken>
            )}
            {countryId && (
                <FilterToken onCloseBtnClick={() => handleChange('country')}>
                    {selectedCountry.value}
                </FilterToken>
            )}
            {selectedFilmType.value !== 'Любой' && (
                <FilterToken onCloseBtnClick={() => handleChange('type')}>
                    {selectedFilmType.value}
                </FilterToken>
            )}
        </div>
    );
};
