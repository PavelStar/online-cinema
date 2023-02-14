import { IFilmData } from '../types';

export const getFilms = async (
    inputValue: string,
): Promise<IFilmData[] | undefined> => {
    try {
        const response = await fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${inputValue}&page=1`,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': '2c793418-8e9b-4826-bd70-2207877f5a0a',
                    'Content-Type': 'application/json',
                },
            },
        );
        const json = await response.json();
        return json.films;
    } catch (e) {
        console.log(e);
    }
};
