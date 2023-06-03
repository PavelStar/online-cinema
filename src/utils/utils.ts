import { FilmType, ISearchParams, ItemType } from '../types/types';

export const setTypeOfFilm = (value: ItemType): string | null => {
    switch (value) {
        case 'FILM':
            return 'Фильм';
        case 'TV_SERIES':
            return 'Сериал';
        case 'TV_SHOW':
            return 'Тв. шоу';
        case 'MINI_SERIES':
            return 'Мини сериал';
        case 'VIDEO':
            return 'Видео';
        default:
            return null;
    }
};

export const searchParams: ISearchParams = {
    order: null,
    countryId: null,
    genreId: null,
    ratingFrom: null,
    ratingTo: null,
    type: null,
    yearFrom: null,
    yearTo: null,
    page: 1,
};

export const orderData = [
    { id: 1, value: 'Много оценок' },
    { id: 2, value: 'Высокий рейтинг' },
    { id: 3, value: 'По новизне' },
];

// export const itemTypeData = [
//     { id: 1, value: 'Любой' },
//     { id: 2, value: 'Фильм' },
//     { id: 3, value: 'Сериал' },
//     { id: 4, value: 'Тв. шоу' },
//     { id: 5, value: 'Мини сериал' },
// ];

export const itemTypeData: FilmType = [
    { id: 1, label: 'ALL', value: 'Любой' },
    { id: 2, label: 'FILM', value: 'Фильм' },
    { id: 3, label: 'TV_SERIES', value: 'Сериал' },
    { id: 4, label: 'TV_SHOW', value: 'Тв. шоу' },
    { id: 5, label: 'MINI_SERIES', value: 'Мини сериал' },
];
