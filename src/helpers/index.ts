import isScreenMd from './isScreenMd';
import { getFromLocalStorage, setToLocalStorage } from './localStorage';
import { setCookie, getCookie, deleteCookie } from './cookies';
import { getUserByLogin, getUserById } from './users';
import { getTopMovies, getGenres, getFilmById, getMoviesByGenre, getMoviesByQuery, getChannelsMock } from './api';

export {
    isScreenMd,
    getFromLocalStorage,
    setToLocalStorage,
    setCookie,
    getCookie,
    deleteCookie,
    getUserByLogin,
    getUserById,
    getTopMovies,
    getGenres,
    getFilmById,
    getMoviesByGenre,
    getMoviesByQuery,
    getChannelsMock,
};
