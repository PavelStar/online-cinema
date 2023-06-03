import {
    IFilmByKeyword,
    IFilmExtended,
    IFilmFromTop,
    IFilteredFilms,
    IGenresAndCountries,
    ISearchParams,
    ISimilarFilms,
    TopType,
} from '../types/types';

export const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': '2c793418-8e9b-4826-bd70-2207877f5a0a',
        // 'X-API-KEY': '2517f59d-dfd7-45e9-af34-888900948beb',
        'Content-Type': 'application/json',
    },
};

export const getFilms = async (
    inputValue: string,
): Promise<IFilmByKeyword[] | undefined> => {
    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${inputValue}&page=1`,
        options,
    );
    const json = await response.json();
    return json.films;
};

export const getFilmById = async (id: string): Promise<IFilmExtended> => {
    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
        options,
    );
    return await response.json();
};

export const getStaffByFilmId = async (id: string): Promise<any> => {
    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`,
        options,
    );
    return await response.json();
};

export const getSimilarFilms = async (
    id: string,
): Promise<{ total: number; items: ISimilarFilms[] }> => {
    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`,
        options,
    );
    return await response.json();
};

export const getCountriesAndGenres = async (): Promise<IGenresAndCountries> => {
    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/filters`,
        options,
    );
    return await response.json();
};

export const getMoviesByFilterParams = async (
    params: ISearchParams,
): Promise<{ total: number; totalPages: number; items: IFilteredFilms[] }> => {
    const countries = params.countryId ? `&countries=${params.countryId}` : '';
    const genres = params.genreId ? `&genres=${params.genreId}` : '';
    const ratingFrom = params.ratingFrom
        ? `&ratingFrom=${params.ratingFrom}`
        : '';
    const ratingTo = params.ratingTo ? `&ratingTo=${params.ratingTo}` : '';
    const yearFrom = params.yearFrom ? `&yearFrom=${params.yearFrom}` : '';
    const yearTo = params.yearTo ? `&yearTo=${params.yearTo}` : '';
    const order = params.order ? `&order=${params.order}` : '&order=NUM_VOTE';
    const type = params.type ? `&type=${params.type}` : '';

    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?${countries}${genres}${order}${type}${ratingFrom}${ratingTo}${yearFrom}${yearTo}&page=${params.page}`,
        options,
    );
    return await response.json();
};

export const getTops = async (
    type?: TopType,
    pageNum?: number | string,
): Promise<{
    pagesCount: number;
    films: IFilmFromTop[];
}> => {
    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${
            type ?? ''
        }&page=${pageNum ?? 1}`,
        options,
    );
    // console.log('pageNum', pageNum);
    return await response.json();
};
