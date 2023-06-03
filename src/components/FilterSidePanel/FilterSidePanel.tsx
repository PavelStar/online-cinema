import React, { FC, useEffect } from 'react';
import { itemTypeData } from '../../utils/utils';
import styles from './FilterSidePanel.module.scss';
import Select, { IOption } from '../Select/Select';
import {
    FilterParamType,
    IGenresAndCountries,
    ItemType,
} from '../../types/types';
import { getCountriesAndGenres } from '../../API/api';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCountryId,
    setGenreId,
    setType,
    setCountries,
    setGenres,
    setSelectedGenre,
    setSelectedCountry,
    setSelectedFilmType,
} from '../../store/FilterEntitiesSlice';
import { AppDispatch, RootState } from '../../store/store';

interface IDataToSelect {
    genres: Array<{ id: number; value: string }>;
    countries: Array<{ id: number; value: string }>;
}

export const FilterSidePanel: FC = (): JSX.Element => {
    const searchParamsState = useSelector(
        (state: RootState) => state.filterEntitiesSlice,
    );
    const dispatch = useDispatch<AppDispatch>();
    const {
        genres,
        countries,
        selectedGenre,
        selectedCountry,
        selectedFilmType,
    } = searchParamsState;

    useEffect(() => {
        getCountriesAndGenres()
            .then((res) => {
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                let obj = {} as IDataToSelect;
                for (const key in res) {
                    obj = {
                        ...obj,
                        [key]: res[key as keyof IGenresAndCountries].map(
                            (item) => {
                                const guard =
                                    'genre' in item ? item.genre : item.country;
                                return {
                                    id: item.id,
                                    value: guard,
                                };
                            },
                        ),
                    };
                }
                dispatch(setCountries(obj.countries));
                dispatch(setGenres(obj.genres));
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (searchParamsState.searchParams.genreId === null)
            dispatch(setSelectedGenre(null));
        if (searchParamsState.searchParams.countryId === null)
            dispatch(setSelectedCountry(null));
        if (searchParamsState.searchParams.type === null)
            dispatch(setSelectedFilmType(null));
    }, [searchParamsState]);

    const handleChange = (
        action: FilterParamType,
        optionData: IOption,
    ): void => {
        if (action === 'genre') {
            console.log(optionData);
            dispatch(setGenreId(optionData.id));
            dispatch(setSelectedGenre(optionData));
        }
        if (action === 'country') {
            dispatch(setCountryId(optionData.id));
            dispatch(setSelectedCountry(optionData));
        }
        if (action === 'type') {
            if (typeof optionData === 'object' && 'id' in optionData) {
                let itemType: ItemType | null = null;
                if (optionData.id === 1) itemType = null;
                if (optionData.id === 2) itemType = 'FILM';
                if (optionData.id === 3) itemType = 'TV_SERIES';
                if (optionData.id === 4) itemType = 'TV_SHOW';
                if (optionData.id === 5) itemType = 'MINI_SERIES';
                dispatch(setType(itemType as ItemType));
                dispatch(setSelectedFilmType(optionData));
            }
        }
    };

    return (
        <div className={styles['filters-panel']}>
            <div className={styles['selects-block']}>
                {itemTypeData && (
                    // eslint-disable-next-line react/jsx-no-undef
                    <Select
                        selectedOption={selectedFilmType}
                        options={itemTypeData}
                        selectTitle="Тип фильма"
                        onOptionChange={(option) =>
                            handleChange('type', option)
                        }
                    />
                )}
                {genres && (
                    <Select
                        selectedOption={selectedGenre}
                        options={genres}
                        selectTitle="Жанры"
                        onOptionChange={(option) =>
                            handleChange('genre', option)
                        }
                    />
                )}
                {countries && (
                    <Select
                        selectedOption={selectedCountry}
                        options={countries}
                        selectTitle="Страны"
                        onOptionChange={(option) =>
                            handleChange('country', option)
                        }
                    />
                )}
            </div>
        </div>
    );
};
