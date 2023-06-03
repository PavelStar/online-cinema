export type ItemType =
    | 'ALL'
    | 'FILM'
    | 'TV_SERIES'
    | 'TV_SHOW'
    | 'MINI_SERIES'
    | 'VIDEO';
export type OrderType = 'RATING' | 'YEAR' | 'NUM_VOTE';

export type FilmType = Array<{
    id: number;
    label?: ItemType;
    value: string;
}>;

export interface ICountry {
    country: string;
    id: number;
}
export interface IGenre {
    genre: string;
    id: number;
}

export interface IGenresAndCountries {
    genres: IGenre[];
    countries: ICountry[];
}

export interface IFilmByKeyword {
    filmId: number;
    nameRu: string;
    nameEn: string;
    year: string;
    description: string;
    filmLength: string;
    countries: ICountry[];
    genres: IGenre[];
    rating: string;
    ratingVoteCount: number;
    posterUrl: string;
    posterUrlPreview: string;
}

export interface IFilmExtended {
    kinopoiskId: number;
    filmId: number;
    nameRu: string;
    nameEn: string;
    nameOriginal: string;
    posterUrl: string;
    posterUrlPreview: string;
    coverUrl: string;
    ratingKinopoisk: number;
    ratingAwait: number;
    ratingKinopoiskVoteCount: number;
    year: number;
    filmLength: number;
    slogan: string;
    description: string;
    shortDescription: string;
    countries: ICountry[];
    genres: IGenre[];
}

export interface IFilmFromTop {
    countries: ICountry[];
    filmId: number;
    filmLength: string;
    genres: IGenre[];
    nameEn: string;
    nameRu: string;
    posterUrl: string;
    posterUrlPreview: string;
    rating: string;
    ratingVoteCount: number;
    year: string;
}

export interface IFilteredFilms {
    kinopoiskId: number;
    nameRu: string;
    nameOriginal: string;
    countries: ICountry[];
    genres: IGenre[];
    ratingKinopoisk: number;
    year: number;
    posterUrlPreview: string;
    type: ItemType;
}

export interface IFilteredFilmsResponse {
    total: number;
    totalPages: number;
    items: IFilteredFilms[];
}

export interface ISimilarFilms {
    filmId: number;
    nameRu: string;
    nameEn: string;
    nameOriginal: string;
    posterUrlPreview: string;
}

export interface IPerson {
    staffId: number;
    nameRu: string;
    nameEn: string;
    posterUrl: string;
    professionText: string;
    professionKey: string;
}

export interface ISearchParams {
    order: OrderType | null;
    type: ItemType | null;
    countryId: number | null;
    genreId: number | null;
    ratingFrom: number | null;
    ratingTo: number | null;
    yearFrom: number | null;
    yearTo: number | null;
    page: number;
}

export type FilterParamType =
    | 'genre'
    | 'country'
    | 'new'
    | 'highRated'
    | 'page'
    | 'order'
    | 'comingSoon'
    | 'type';

export type TopType =
    | 'TOP_250_BEST_FILMS'
    | 'TOP_100_POPULAR_FILMS'
    | 'TOP_AWAIT_FILMS';
