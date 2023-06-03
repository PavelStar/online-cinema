import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ISearchParams, ItemType, OrderType } from '../types/types';
import { IOption } from '../components/Select/Select';
import { itemTypeData, orderData } from '../utils/utils';

interface IFilterEntitiesSlice {
    searchParams: ISearchParams;
    countries: IOption[];
    genres: IOption[];
    selectedOrder: IOption;
    selectedCountry: IOption;
    selectedGenre: IOption;
    selectedFilmType: IOption;
}

const defaultOption = { id: 0.1, value: 'Люб.' };

const initialState: IFilterEntitiesSlice = {
    searchParams: {
        order: null,
        countryId: null,
        genreId: null,
        ratingFrom: null,
        ratingTo: null,
        type: null,
        yearFrom: null,
        yearTo: null,
        page: 1,
    },
    countries: [defaultOption],
    genres: [defaultOption],
    selectedOrder: orderData[0],
    selectedCountry: defaultOption,
    selectedGenre: defaultOption,
    selectedFilmType: itemTypeData[0],
};

export const FilterEntitiesSlice = createSlice({
    name: 'filterEntitiesSlice',
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<ItemType | null>) => {
            state.searchParams.type = action.payload;
        },
        setGenreId: (state, action: PayloadAction<number | null>) => {
            if (action.payload === 0.1) {
                state.searchParams.genreId = null;
            } else {
                state.searchParams.genreId = action.payload;
            }
        },
        setCountryId: (state, action: PayloadAction<number | null>) => {
            if (action.payload === 0.1) {
                state.searchParams.countryId = null;
            } else {
                state.searchParams.countryId = action.payload;
            }
        },
        setOrder: (state, action: PayloadAction<OrderType | null>) => {
            state.searchParams.order = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.searchParams.page = action.payload;
        },
        setCountries: (state, action: PayloadAction<IOption[]>) => {
            state.countries = state.countries.concat(action.payload);
        },
        setGenres: (state, action: PayloadAction<IOption[]>) => {
            state.genres = state.genres.concat(action.payload);
        },
        setSelectedOrder: (state, action: PayloadAction<IOption>) => {
            state.selectedOrder = action.payload;
        },
        setSelectedCountry: (state, action: PayloadAction<IOption | null>) => {
            if (action.payload == null) {
                state.selectedCountry = defaultOption;
            } else {
                state.selectedCountry = action.payload;
            }
        },
        setSelectedGenre: (state, action: PayloadAction<IOption | null>) => {
            if (action.payload == null) {
                state.selectedGenre = defaultOption;
            } else {
                state.selectedGenre = action.payload;
            }
        },
        setSelectedFilmType: (state, action: PayloadAction<IOption | null>) => {
            if (action.payload === null) {
                state.selectedFilmType = itemTypeData[0];
            } else {
                state.selectedFilmType = action.payload;
            }
        },
        resetSearchParams: (state, action: PayloadAction<null>) => {
            const newObj = Object.fromEntries(
                Object.entries({ ...state.searchParams }).map((item) => {
                    if (item[0] !== 'page') {
                        return [item[0], action.payload];
                    } else {
                        return [item[0], 1];
                    }
                }),
            );
            state.searchParams = { ...state.searchParams, ...newObj };
        },
    },
});

export const {
    setType,
    setGenreId,
    setCountryId,
    setOrder,
    setPage,
    setGenres,
    setCountries,
    setSelectedOrder,
    setSelectedGenre,
    setSelectedCountry,
    setSelectedFilmType,
    resetSearchParams,
} = FilterEntitiesSlice.actions;

export default FilterEntitiesSlice.reducer;
