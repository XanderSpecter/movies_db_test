import axios from 'axios';
import { Film, Genre, Channel } from '../models';

const kinopoiskApiConfig = {
    headers: {
        'X-API-KEY': 'b63109a6-fb53-43b9-93da-972178acfb98',
        'accept': 'application/json',
    },
};

interface GetMoviesResponseData {
    films: Film[];
    pagesCount: number;
}

export const getTopMovies = async () => {
    try {
        const result = await axios.get<GetMoviesResponseData>(
            'https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=BEST_FILMS_LIST&page=1&listId=1',
            kinopoiskApiConfig
        );

        if (result.status === 200) {
            return result.data.films;
        }

        return null;
    } catch (e) {
        return null;
    }
};

export const getMoviesByGenre = async (genre: string) => {
    try {
        const result = await axios.get<GetMoviesResponseData>(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${genre}&order=RATING&page=1`,
            kinopoiskApiConfig
        );

        if (result.status === 200) {
            return result.data.films;
        }

        return null;
    } catch (e) {
        return null;
    }
};

export const getMoviesByQuery = async (query: string) => {
    try {
        const result = await axios.get<GetMoviesResponseData>(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${query}&page=1`,
            kinopoiskApiConfig
        );

        if (result.status === 200) {
            return result.data.films;
        }

        return null;
    } catch (e) {
        return null;
    }
};

interface GetGenresResponseData {
    genres: Genre[];
}

export const getGenres = async () => {
    try {
        const result = await axios.get<GetGenresResponseData>(
            'https://kinopoiskapiunofficial.tech/api/v2.1/films/filters',
            kinopoiskApiConfig
        );

        if (result.status === 200) {
            const fetchedGenres = result.data.genres;

            const filteredGenres = fetchedGenres.filter((genre) => {
                return (
                    genre.genre === 'комедия' ||
                    genre.genre === 'драма' ||
                    genre.genre === 'фантастика' ||
                    genre.genre === 'ужасы' ||
                    genre.genre === 'боевик' ||
                    genre.genre === 'мультфильм' ||
                    genre.genre === 'мюзикл'
                );
            });

            return filteredGenres;
        }

        return null;
    } catch (e) {
        return null;
    }
};

interface GetFilmByIdResponseData {
    data: Film;
}

export const getFilmById = async (id: number) => {
    try {
        const result = await axios.get<GetFilmByIdResponseData>(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`,
            kinopoiskApiConfig
        );

        if (result.status === 200) {
            return result.data.data;
        }

        return null;
    } catch (e) {
        return null;
    }
};

const channel: Channel = {
    name: 'Первый канал',
    shows: [
        {
            time: '09:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '10:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '11:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '12:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '13:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '14:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '15:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '16:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '17:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '18:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '19:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '20:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '21:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '22:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
        {
            time: '23:00',
            name: 'Не нашел годную апишку для каналов, так что вот',
        },
    ],
};

export const getChannelsMock = (): Channel[] => {
    return new Array<Channel>(10).fill(channel, 0, 9);
};
